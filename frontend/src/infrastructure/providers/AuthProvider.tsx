import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { router } from 'expo-router';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, isAuthenticated, login } = useAuthStore();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await EncryptedStorage.getItem('auth-storage');
        
        if (session) {
          const { state } = JSON.parse(session);
          if (state.token && !isAuthenticated) {
            login(state.token, state.user);
          }
        }
        
        if (!token && router.canGoBack()) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Auth check failed', error);
      }
    };
    
    checkAuth();
  }, [token, isAuthenticated, login]);

  return <>{children}</>;
};