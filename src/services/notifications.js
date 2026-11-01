import { Platform } from 'react-native';
import { getReminders, saveReminders } from '../storage/localStorage';

const CHANNEL_ID = 'reminders';
let channelReady = false;
const channelOption = () => (channelReady ? { channelId: CHANNEL_ID } : {});

let Notifications = null;
if (Platform.OS !== 'web') {
  // Expo Go logs a warning on import about push features; local reminders are unaffected.
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('expo-notifications')) return;
    originalWarn(...args);
  };
  Notifications = require('expo-notifications');
  console.warn = originalWarn;
}
const isSupported = Notifications !== null;

if (isSupported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export const notificationsAvailable = isSupported;

// Returns true when the user has granted (or just granted) notification permission.
export async function ensureNotificationPermission() {
  if (!isSupported) return false;

  if (Platform.OS === 'android') {
    // The permission prompt on Android 13+ needs a channel, but Expo Go can't create one;
    // in that case notifications fall back to the default channel.
    try {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: 'Reminders',
        importance: Notifications.AndroidImportance.MAX,
      });
      channelReady = true;
    } catch {
      channelReady = false;
    }
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function sendEnabledNotification() {
  return sendTestNotification('Notifications enabled', "You'll now receive your workout reminders.");
}

export async function sendTestNotification(
  title = 'Test notification',
  body = 'Notifications are working!'
) {
  if (!isSupported) return;
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 1,
      ...channelOption(),
    },
  });
}

export async function scheduleReminderNotification(date) {
  if (!isSupported || date.getTime() <= Date.now()) return null;
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Workout reminder',
      body: `Time to get moving! Your ${formatTime(date)} workout is due.`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
      ...channelOption(),
    },
  });
}

export async function cancelReminderNotification(notificationId) {
  if (!isSupported || !notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId).catch(() => {});
}

export function reminderDate(reminder) {
  const [year, month, day] = reminder.date.split('-').map(Number);
  const [hours, minutes] = reminder.time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

function formatTime(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Cancels every scheduled reminder when disabled, and reschedules upcoming ones when enabled.
export async function syncReminders(enabled) {
  const reminders = await getReminders();
  const next = [];

  for (const reminder of reminders) {
    await cancelReminderNotification(reminder.notificationId);
    const notificationId = enabled ? await scheduleReminderNotification(reminderDate(reminder)) : null;
    next.push({ ...reminder, notificationId });
  }

  await saveReminders(next);
}
