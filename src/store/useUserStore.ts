// src/store/useUserStore.ts
import { IUser, IProfile, IAuthState, Role } from '@/types/AuthTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState extends IAuthState {
  // Actions
  setAuth: (user: IUser, profile: IProfile) => void;
  setProfile: (profile: IProfile) => void;
  updateProfile: (updates: Partial<IProfile>) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  
  // Getters
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isClient: () => boolean;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      profile: null,
      loading: true,

      // Actions
      setAuth: (user: IUser, profile: IProfile) => 
        set({ 
          user, 
          profile,  
          loading: false 
        }),

      setProfile: (profile: IProfile) => {
        const currentUser = get().user;
        if (currentUser) {
          // Sincronizar datos del perfil con el usuario
          const updatedUser: IUser = {
            ...currentUser,
            name: profile.full_name,
            role: profile.role,
            avatar_url: profile.avatar_url,
          };
          set({ profile, user: updatedUser });
        } else {
          set({ profile });
        }
      },

      updateProfile: (updates: Partial<IProfile>) => {
        const currentProfile = get().profile;
        const currentUser = get().user;
        
        if (currentProfile) {
          const updatedProfile = { ...currentProfile, ...updates };
          const updatedUser = currentUser ? {
            ...currentUser,
            name: updatedProfile.full_name,
            role: updatedProfile.role,
            avatar_url: updatedProfile.avatar_url,
          } : null;
          
          set({ 
            profile: updatedProfile, 
            user: updatedUser 
          });
        }
      },

      setLoading: (loading: boolean) => set({ loading }),

      logout: () => set({ 
        user: null, 
        profile: null, 
        loading: false 
      }),

      // Getters
      isAuthenticated: () => {
        const { user } = get();
        return !!user;
      },

      isAdmin: () => {
        const { profile } = get();
        return profile?.role === Role.ADMIN;
      },

      isClient: () => {
        const { profile } = get();
        return profile?.role === Role.CLIENT;
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        user: state.user, 
        profile: state.profile,
      }),

      // Opcional: versión para migrar datos si cambias la estructura
      version: 1,
    }
  )
);

