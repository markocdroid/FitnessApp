import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContent from './DrawerContent';
import DailyRemindersScreen from '../screens/DailyRemindersScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import FitnessReportsScreen from '../screens/FitnessReportsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainDrawer() {
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

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainDrawer} />
      <Stack.Screen name="Detail" component={ExerciseDetailScreen} />
    </Stack.Navigator>
  );
}
