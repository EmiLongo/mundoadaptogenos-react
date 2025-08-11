// src/store/useUserStore.ts
import { IUser, IProfile, IAuthState, Role } from '@/types/AuthTypes';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IUserState extends IAuthState {
  // State adicional para controlar hidratación
  hasHydrated: boolean;
  
  // Actions
  setAuth: (user: IUser, profile: IProfile) => void;
  setProfile: (profile: IProfile) => void;
  updateProfile: (updates: Partial<IProfile>) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  setHasHydrated: (hydrated: boolean) => void;
  
  // Getters
  isAdmin: () => boolean;
  isClient: () => boolean;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set, get) => ({
      // State inicial
      user: null,
      profile: null,
      loading: true,
      isAuthenticated: false,
      hasHydrated: false,

      // Actions
      setAuth: (user: IUser, profile: IProfile) => {
        set((state) => ({
          ...state,
          user, 
          profile,  
          isAuthenticated: true,
          loading: false,
        }));
        
        // Log inmediato para verificar
        setTimeout(() => {
          const newState = get();
        }, 0);
      },

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
          set({ 
            profile, 
            user: updatedUser,
            isAuthenticated: true
          });
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
            user: updatedUser,
            isAuthenticated: !!updatedUser
          });
        }
      },

      setLoading: (loading: boolean) => set({ loading }),

      logout: () => {
        set({ 
          user: null, 
          profile: null, 
          loading: false, 
          isAuthenticated: false
        });
      },

      setHasHydrated: (hydrated: boolean) => {
        set({ hasHydrated: hydrated });
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        hasHydrated: state.hasHydrated
      }),
      version: 1,
      onRehydrateStorage: () => (state) => {
        
        // Marcar como hidratado después de la rehidratación
        if (state) {
          state.setHasHydrated(true);
          // Si hay datos del usuario, mantener isAuthenticated consistente
          if (state.user && state.profile) {
            state.isAuthenticated = true;
          } else {
            state.isAuthenticated = false;
          }
        }
      },
    }
  )
);