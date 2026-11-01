import { useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { hydrateAndPersistFavorites } from './store/persistFavorites';
import { setNotificationsEnabled } from './store/notificationsSlice';
import { hydrateTheme } from './store/themeSlice';
import { getSettings } from './storage/localStorage';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { appStyles as styles } from './styles/appStyles';
import { useAppTheme } from './hooks/useAppTheme';

function RootNavigator() {
  const dispatch = useDispatch();
  const { colors } = useAppTheme();
  const isThemeHydrated = useSelector((state) => state.theme.isHydrated);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    getSettings().then((settings) => {
      dispatch(setNotificationsEnabled(settings?.notificationsEnabled === true));
      dispatch(hydrateTheme(settings?.isLightMode !== false));
    });
  }, [dispatch]);

  if (isLoading || !isThemeHydrated) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}

function AppNavigation() {
  const { colors, isLightMode } = useAppTheme();
  const navigationTheme = useMemo(() => {
    const baseTheme = isLightMode ? DefaultTheme : DarkTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        primary: colors.accent,
        notification: colors.favorite,
      },
    };
  }, [colors, isLightMode]);

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style={isLightMode ? 'dark' : 'light'} />
    </>
  );
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
            <AppNavigation />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
