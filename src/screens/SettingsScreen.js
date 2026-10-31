import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import TopNavBar from '../components/TopNavBar';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { saveSettings } from '../storage/localStorage';
import { setLightMode } from '../store/themeSlice';
import { settingsStyles } from '../styles/settingsStyles';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { colors, isLightMode } = useAppTheme();
  const styles = settingsStyles;
  const { user, updateUserProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [fitnessPreferences, setFitnessPreferences] = useState(user?.fitnessPreferences || '');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setFullName(user?.fullName || user?.username || '');
    setEmail(user?.email || '');
    setFitnessPreferences(user?.fitnessPreferences || '');
  }, [user]);

  const toggleLightMode = async (value) => {
    dispatch(setLightMode(value));
    setMessage('');
    setHasError(false);
    await saveSettings({ isLightMode: value });
  };

  const saveChanges = async () => {
    if (!isEditing) return;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setMessage('Please enter your full name.');
      setHasError(true);
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setMessage('Please enter a valid email address.');
      setHasError(true);
      return;
    }

    await updateUserProfile({
      ...user,
      fullName: trimmedName,
      username: trimmedName,
      email: trimmedEmail,
      fitnessPreferences: fitnessPreferences.trim(),
    });
    setFullName(trimmedName);
    setEmail(trimmedEmail);
    setFitnessPreferences(fitnessPreferences.trim());
    setIsEditing(false);
    setMessage('Your changes have been saved.');
    setHasError(false);
  };

  // Locked fields are dimmed and show a lock; editable fields get an accent underline.
  const inputStateStyle = isEditing
    ? { borderBottomWidth: 1.5, borderBottomColor: colors.accent }
    : styles.inputLocked;
  const lockIcon = isEditing ? null : (
    <Ionicons name="lock-closed-outline" size={14} color={colors.subtitle} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <TopNavBar title="Settings" />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
            <View style={[styles.avatar, { backgroundColor: colors.avatar }]}>
              <Ionicons name="person-outline" size={38} color={colors.subtitle} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={[styles.profileName, { color: colors.text }]} numberOfLines={1}>
                {fullName || 'Your Name'}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.subtitle }]} numberOfLines={1}>
                {email || 'email@example.com'}
              </Text>
            </View>
          </View>

          <View style={styles.formContent}>
            <Text style={[styles.sectionTitle, { color: colors.subtitle }]}>APPEARANCE</Text>
            <View style={[styles.appearanceCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.appearanceLabel, { color: colors.text }]}>Dark Mode</Text>
              <Switch
                accessibilityLabel="Dark Mode"
                accessibilityRole="switch"
                value={!isLightMode}
                onValueChange={(isDark) => toggleLightMode(!isDark)}
                trackColor={{ false: '#777887', true: '#2fc856' }}
                thumbColor="#ffffff"
              />
            </View>

            <Text style={[styles.sectionTitle, styles.accountTitle, { color: colors.subtitle }]}>
              ACCOUNT INFORMATION
            </Text>
            <View style={[styles.fieldsCard, { backgroundColor: colors.card }]}>
              <View style={[styles.field, { borderBottomColor: colors.border }]}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.fieldLabel, { color: colors.text }]}>FULL NAME</Text>
                  {lockIcon}
                </View>
                <TextInput
                  accessibilityLabel="Full name"
                  editable={isEditing}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="next"
                  style={[styles.input, inputStateStyle, { color: colors.text }]}
                  value={fullName}
                />
              </View>
              <View style={[styles.field, { borderBottomColor: colors.border }]}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.fieldLabel, { color: colors.text }]}>EMAIL ADDRESS</Text>
                  {lockIcon}
                </View>
                <TextInput
                  accessibilityLabel="Email address"
                  autoCapitalize="none"
                  editable={isEditing}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="Enter your email address"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="next"
                  style={[styles.input, inputStateStyle, { color: colors.text }]}
                  value={email}
                />
              </View>
              <View style={styles.field}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.fieldLabel, { color: colors.text }]}>FITNESS PREFERENCES</Text>
                  {lockIcon}
                </View>
                <TextInput
                  accessibilityLabel="Fitness preferences"
                  editable={isEditing}
                  onChangeText={setFitnessPreferences}
                  placeholder="e.g. Yoga, Cardio, Strength Training"
                  placeholderTextColor={colors.placeholder}
                  style={[styles.input, inputStateStyle, { color: colors.text }]}
                  value={fitnessPreferences}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  if (isEditing) {
                    setFullName(user?.fullName || user?.username || '');
                    setEmail(user?.email || '');
                    setFitnessPreferences(user?.fitnessPreferences || '');
                    setIsEditing(false);
                    setMessage('');
                    setHasError(false);
                  } else {
                    setIsEditing(true);
                    setMessage('');
                    setHasError(false);
                  }
                }}
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: colors.secondaryButton },
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name={isEditing ? 'close-outline' : 'create-outline'}
                  size={22}
                  color={colors.text}
                />
                <Text style={[styles.buttonLabel, { color: colors.text }]}>
                  {isEditing ? 'Cancel' : 'Edit'}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: !isEditing }}
                disabled={!isEditing}
                onPress={saveChanges}
                style={({ pressed }) => [
                  styles.button,
                  styles.saveButton,
                  !isEditing && styles.saveButtonDisabled,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name="save-outline" size={22} color="#ffffff" />
                <Text style={styles.saveButtonLabel}>Save Changes</Text>
              </Pressable>
            </View>
            {message ? (
              <Text
                accessibilityLiveRegion="polite"
                style={[styles.message, { color: hasError ? colors.error : colors.text }]}
              >
                {message}
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
