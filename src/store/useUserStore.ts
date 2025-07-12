// src/store/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../api/authApi';

interface IUserState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useUserStore = create<IUserState>()(
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

