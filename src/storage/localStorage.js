import AsyncStorage from '@react-native-async-storage/async-storage';

// Existing keys are kept so data saved by earlier versions of the app still loads.
const KEYS = {
  profile: 'fitnessapp:auth-user',
  completions: 'fitnessapp:daily-workout-completions',
  favorites: 'fitnessapp:favorites',
  actions: 'fitnessapp:user-actions',
  notifications: 'fitnessapp:notifications',
  settings: 'fitnessapp:settings',
};

const MAX_ACTIONS = 100;

async function readJson(key, fallback) {
  try {
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    // Corrupt or unavailable storage falls back to an empty value.
    return fallback;
  }
}

async function writeJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the in-memory state usable if storage is temporarily unavailable.
  }
}

// Only the non-sensitive profile is stored; passwords are never kept on-device.
export const saveUserProfile = (profile) => writeJson(KEYS.profile, profile);
export const getUserProfile = () => readJson(KEYS.profile, null);
export const removeUserProfile = () => AsyncStorage.removeItem(KEYS.profile).catch(() => {});

export const saveFavorites = (favorites) => writeJson(KEYS.favorites, favorites);
export const getFavorites = () => readJson(KEYS.favorites, []);

export const saveDailyCompletions = (completions) => writeJson(KEYS.completions, completions);
export const getDailyCompletions = () => readJson(KEYS.completions, {});

export const saveNotifications = (notifications) => writeJson(KEYS.notifications, notifications);
export const getNotifications = () => readJson(KEYS.notifications, []);

export const saveSettings = (settings) => writeJson(KEYS.settings, settings);
export const getSettings = () => readJson(KEYS.settings, {});

export const getUserActions = () => readJson(KEYS.actions, []);
export const clearUserActions = () => AsyncStorage.removeItem(KEYS.actions).catch(() => {});

// Appends to the stored history (newest first, capped) and returns the updated list.
export async function saveUserAction(action) {
  const actions = await getUserActions();
  const next = [
    { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, timestamp: Date.now(), ...action },
    ...actions,
  ].slice(0, MAX_ACTIONS);
  await writeJson(KEYS.actions, next);
  return next;
}
