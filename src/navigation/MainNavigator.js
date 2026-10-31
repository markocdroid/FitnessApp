import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import DailyRemindersScreen from '../screens/DailyRemindersScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import FitnessReportsScreen from '../screens/FitnessReportsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{ drawerPosition: 'right', headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Daily Reminders" component={DailyRemindersScreen} />
      <Drawer.Screen name="Fitness Reports" component={FitnessReportsScreen} />
      {/* Lives in the drawer so the top bar can open it; hidden from the menu list. */}
      <Drawer.Screen
        name="Detail"
        component={ExerciseDetailScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  return <MainDrawer />;
}
