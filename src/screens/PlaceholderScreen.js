import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavBar from '../components/TopNavBar';
import { placeholderStyles as styles } from '../styles/placeholderStyles';

// Shared body for screens that don't have dedicated content yet.
export default function PlaceholderScreen({ title, message }) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <TopNavBar title={title} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}
