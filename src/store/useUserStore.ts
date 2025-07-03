// src/store/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../api/authApi';

type UserState = {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);


// usos
// const user = useUserStore((state) => state.user);
// const token = useUserStore((state) => state.token);
// const logout = useUserStore((state) => state.logout);
// const isAuthenticated = useUserStore((state) => state.isAuthenticated());

