// src/store/useUserStore.ts
import { IUser, IAuthState, Role } from '@/types/AuthTypes';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IUserState extends IAuthState {
  // Actions
  setAuth: (user: IUser) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<IUser>) => void;
  logout: () => void;
  
  // Getters
  isAdmin: () => boolean;
  isClient: () => boolean;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set, get) => ({
      // State inicial
      user: null,
      loading: true,
      isAuthenticated: false,

      // Actions
      setAuth: (user: IUser) => {
        set((state) => ({
          ...state,
          user, 
          isAuthenticated: !!user,
          loading: false,
        }));
      },


      updateUser: (updates: Partial<IUser>) => {
        const currentUser = get().user;
        
        if (currentUser) {
          const updatedUser: IUser = {
            ...currentUser,
            ...updates
          };
          
          set({ 
            user: updatedUser,
            isAuthenticated: !!updatedUser
          });
        }
      },

      setLoading: (loading: boolean) => set({ loading }),

      logout: () => {
        set({ 
          user: null, 
          loading: false, 
          isAuthenticated: false
        });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === Role.ADMIN;
      },

      isClient: () => {
        const { user } = get();
        return user?.role === Role.CLIENT;
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
      }),
      version: 1,
    }
  )
);