import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { topNavBarStyles } from '../styles/topNavBarStyles';

// App icon (left) + title (middle) + drawer toggle (right), opens the drawer on its right-hand side.
export default function TopNavBar({ title, titleColor, menuColor }) {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = useMemo(() => topNavBarStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, titleColor ? { color: titleColor } : null]} numberOfLines={1}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={[styles.menuIcon, menuColor ? { color: menuColor } : null]}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}
