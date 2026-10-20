import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';

// Logout is an action, not a route, so it's handled here instead of as a Drawer.Screen.
export default function DrawerContent(props) {
  const { signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={signOut} />
    </DrawerContentScrollView>
  );
}
