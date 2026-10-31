import { useMemo, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { drawerStyles } from '../styles/drawerStyles';

const MENU_ITEMS = [
  { route: 'Home', label: 'Home', icon: 'home-outline' },
  { route: 'Settings', label: 'Settings', icon: 'settings-outline' },
  { route: 'My Favourites', label: 'My Favourites', icon: 'heart-outline' },
  { route: 'Daily Reminders', label: 'Daily Reminders', icon: 'time-outline' },
  { route: 'Fitness Reports', label: 'Fitness Reports', icon: 'stats-chart-outline' },
];

function MenuRow({ icon, label, onPress, isLogout, selected, colors, styles }) {
  return (
    <View style={[styles.highlight, selected && styles.highlightSelected]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: !!selected }}
        onPress={onPress}
        style={({ pressed }) => [styles.row, isLogout && styles.logoutRow, pressed && styles.pressed]}
      >
        <View style={[styles.iconTile, isLogout && styles.logoutTile]}>
          <Ionicons name={icon} size={24} color={colors.text} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

// Logout is an action, not a route, so it's handled here instead of as a Drawer.Screen.
export default function DrawerContent({ navigation, state }) {
  const { signOut } = useAuth();
  const { colors } = useAppTheme();
  const styles = useMemo(() => drawerStyles(colors), [colors]);
  const { width: screenWidth } = useWindowDimensions();
  const progress = useDrawerProgress();
  // Fades out as soon as the drawer starts closing so it never overlaps the screen's own title.
  const titleFade = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.8, 1], [0, 1], 'clamp'),
  }));
  const [headerWidth, setHeaderWidth] = useState(screenWidth);
  // The drawer is narrower than the screen; shift the title left by the difference so it
  // occupies the same screen-space box as the title in TopNavBar (20 padding + 36 logo + 12 margin).
  const titleOffset = 48 - (screenWidth - headerWidth);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'right']}>
      <View style={styles.header} onLayout={(e) => setHeaderWidth(e.nativeEvent.layout.width)}>
        <View style={styles.logoSpacer} />
        <Animated.Text style={[styles.title, { marginLeft: titleOffset }, titleFade]} numberOfLines={1}>
          {state.routes[state.index].name}
        </Animated.Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close menu"
          onPress={() => navigation.closeDrawer()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {MENU_ITEMS.map(({ route, label, icon }) => (
          <MenuRow
            key={route}
            icon={icon}
            label={label}
            selected={state.routes[state.index].name === route}
            onPress={() => navigation.navigate(route)}
            colors={colors}
            styles={styles}
          />
        ))}
        <MenuRow
          icon="arrow-back"
          label="Logout"
          onPress={signOut}
          isLogout
          colors={colors}
          styles={styles}
        />
      </View>
    </SafeAreaView>
  );
}
