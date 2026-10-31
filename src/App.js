import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { hydrateAndPersistFavorites } from './store/persistFavorites';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { appStyles as styles } from './styles/appStyles';
import { COLORS } from './styles/colors';

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}

export default function App() {
  useEffect(() => {
    let unsubscribe;
    let cancelled = false;

    hydrateAndPersistFavorites(store).then((stop) => {
      if (cancelled) stop();
      else unsubscribe = stop;
    });

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
