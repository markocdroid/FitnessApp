import { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

// Temporary stubs for menu selection and a render function:
function FitnessScreen({ title, message }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

function HomeScreen() {
  return <FitnessScreen title="Home Screen" message="Welcome to your fitness app." />;
}

function SettingsScreen() {
  return <FitnessScreen title="Settings" message="Adjust your preferences here." />;
}

function DailyRemindersScreen() {
  return <FitnessScreen title="Daily Reminders" message="Manage your daily reminders." />;
}

function FitnessReportsScreen() {
  return <FitnessScreen title="Fitness Reports" message="View your fitness reports." />;
}

function LogoutScreen() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <FitnessScreen title="Logout" message="You have been logged out." />;
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home Screen">
      <Drawer.Screen name="Home Screen" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Daily Reminders" component={DailyRemindersScreen} />
      <Drawer.Screen name="Fitness Reports" component={FitnessReportsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#18212f',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#566170',
    alignItems: 'center',
    textAlign: 'center',
  },
});
