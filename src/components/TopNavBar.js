import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { topNavBarStyles as styles } from '../styles/topNavBarStyles';

// App icon (left) + title (middle) + drawer toggle (right), opens the drawer on its right-hand side.
export default function TopNavBar({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}
