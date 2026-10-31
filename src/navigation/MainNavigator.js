import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import DailyRemindersScreen from '../screens/DailyRemindersScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import FitnessReportsScreen from '../screens/FitnessReportsScreen';
import HomeScreen from '../screens/HomeScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { COLORS } from '../styles/colors';

const Drawer = createDrawerNavigator();

const FavouritesScreen = () => (
  <PlaceholderScreen title="My Favourites" message="Your favourite workouts will appear here." />
);

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        overlayColor: 'rgba(28, 28, 40, 0.25)',
        drawerStyle: { backgroundColor: COLORS.background },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="My Favourites" component={FavouritesScreen} />
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
