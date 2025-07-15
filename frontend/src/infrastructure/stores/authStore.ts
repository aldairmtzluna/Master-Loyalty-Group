import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthState {
    token: string | null;
    user: { email: string; fullname: string } | null;
    isAuthenticated: boolean;
    login: (token: string, user: { email: string; fullName: string }) => void;
    logout: () => void;
    setUser: (user: { email: string; fullName: string }) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            login: (token, user) => ({ token, user, isAuthenticated: true}),
            logout: () => set({ token: null, user: null, isAuthenticated: false}),
            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => EncryptedStorage),
        }
    )
);