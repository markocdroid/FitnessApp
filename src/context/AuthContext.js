import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(undefined);

// Only the non-sensitive profile is persisted; passwords are never stored on-device.
const AUTH_STORAGE_KEY = 'fitnessapp:auth-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(AUTH_STORAGE_KEY)
      .then((stored) => {
        if (isMounted && stored) {
          setUser(JSON.parse(stored));
        }
      })
      .catch(() => {
        // Ignore corrupt/missing storage and fall back to the login screen
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const persistUser = async (profile) => {
    setUser(profile);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      isLoading,
      // TODO: wire up to a real authentication backend
      signIn: ({ email }) => persistUser({ email }),
      signUp: ({ username, email }) => persistUser({ username, email }),
      signOut: async () => {
        setUser(null);
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      },
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
