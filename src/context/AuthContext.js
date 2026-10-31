import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUserProfile, removeUserProfile, saveUserProfile } from '../storage/localStorage';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getUserProfile().then((stored) => {
      if (!isMounted) return;
      if (stored) setUser(stored);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const persistUser = async (profile) => {
    setUser(profile);
    await saveUserProfile(profile);
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
        await removeUserProfile();
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
