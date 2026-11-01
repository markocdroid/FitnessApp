import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TopNavBar from '../components/TopNavBar';
import { useAppTheme } from '../hooks/useAppTheme';
import {
  cancelReminderNotification,
  reminderDate,
  scheduleReminderNotification,
} from '../services/notifications';
import { getReminders, saveReminders } from '../storage/localStorage';
import { remindersStyles } from '../styles/remindersStyles';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const BLUE = '#29b6f6';
const TIME_PATTERN = /^([01]?\d|2[0-3]):([0-5]\d)$/;

const pad = (n) => String(n).padStart(2, '0');
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    return { date: d, inMonth: d.getMonth() === month };
  });
}

export default function DailyRemindersScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => remindersStyles(colors), [colors]);
  const notificationsEnabled = useSelector((state) => state.notifications.enabled);
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState('');
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getReminders().then(setReminders);
  }, []);

  const todayKey = toKey(today);
  const days = buildMonth(viewDate.getFullYear(), viewDate.getMonth());
  const shiftMonth = (delta) =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));

  const addReminder = async () => {
    const match = TIME_PATTERN.exec(time.trim());
    if (!selected) return setError('Please select a date.');
    if (!match) return setError('Enter a valid time in HH:mm format.');

    const normalizedTime = `${pad(Number(match[1]))}:${match[2]}`;
    const reminder = { id: String(Date.now()), date: selected, time: normalizedTime, notificationId: null };
    if (reminderDate(reminder).getTime() <= Date.now()) {
      return setError('Pick a date and time in the future.');
    }

    if (notificationsEnabled) {
      try {
        reminder.notificationId = await scheduleReminderNotification(reminderDate(reminder));
      } catch {
        return setError('Could not schedule the notification.');
      }
    }

    const next = [...reminders, reminder].sort(
      (a, b) => reminderDate(a).getTime() - reminderDate(b).getTime()
    );
    setReminders(next);
    await saveReminders(next);
    setTime('');
    setError(
      notificationsEnabled ? '' : 'Saved. Turn on Enable Notifications in Settings to get alerts.'
    );
  };

  const removeReminder = async (reminder) => {
    await cancelReminderNotification(reminder.notificationId);
    const next = reminders.filter((r) => r.id !== reminder.id);
    setReminders(next);
    await saveReminders(next);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TopNavBar title="Daily Reminders" titleColor={colors.text} menuColor={colors.text} />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.monthRow}>
          <Pressable accessibilityLabel="Previous month" onPress={() => shiftMonth(-1)} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={BLUE} />
          </Pressable>
          <Text style={styles.monthTitle}>
            {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
          </Text>
          <Pressable accessibilityLabel="Next month" onPress={() => shiftMonth(1)} hitSlop={12}>
            <Ionicons name="chevron-forward" size={24} color={BLUE} />
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {WEEKDAYS.map((d) => (
            <Text key={d} style={styles.weekday}>{d}</Text>
          ))}
        </View>

        <View style={styles.grid}>
          {days.map(({ date, inMonth }) => {
            const key = toKey(date);
            const isSelected = key === selected;
            return (
              <Pressable
                key={key}
                style={styles.dayCell}
                onPress={() => {
                  setSelected(key);
                  setError('');
                }}
              >
                <View style={[styles.dayInner, isSelected && styles.daySelected]}>
                  <Text
                    style={[
                      styles.dayText,
                      !inMonth && styles.dayMuted,
                      key === todayKey && styles.dayToday,
                      isSelected && styles.daySelectedText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          accessibilityLabel="Reminder time"
          style={styles.input}
          value={time}
          onChangeText={(value) => {
            setTime(value);
            setError('');
          }}
          placeholder="Enter Time (HH:mm)"
          placeholderTextColor={colors.placeholder}
          keyboardType="numbers-and-punctuation"
          maxLength={5}
        />
        <Text style={styles.info}>Date: {selected || 'None'}</Text>
        <Text style={styles.info}>Time: {time.trim() || '--:--'}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          accessibilityRole="button"
          onPress={addReminder}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <Text style={styles.addButtonLabel}>Add Reminder</Text>
        </Pressable>

        <Text style={styles.listTitle}>All Reminders:</Text>
        {reminders.length === 0 ? (
          <Text style={styles.empty}>No reminders yet.</Text>
        ) : (
          reminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderRow}>
              <Text style={styles.reminderText}>
                {reminder.date} at {reminder.time}
              </Text>
              <Pressable
                accessibilityLabel="Delete reminder"
                onPress={() => removeReminder(reminder)}
                hitSlop={10}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
