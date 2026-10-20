import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import DailyRemindersScreen from '../screens/DailyRemindersScreen';
import FitnessReportsScreen from '../screens/FitnessReportsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ drawerPosition: 'right', headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Daily Reminders" component={DailyRemindersScreen} />
      <Drawer.Screen name="Fitness Reports" component={FitnessReportsScreen} />
    </Drawer.Navigator>
  );
}
