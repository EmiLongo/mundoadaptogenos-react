// src/shared/hooks/AuthProvider.tsx
import { supabase } from "@/api/apiClient";
import { useUserStore } from "@/store/useUserStore";
import { IProfile, IUser } from "@/types/AuthTypes";
import { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setAuth, logout, setLoading, hasHydrated } = useUserStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const loadUserProfile = async (user: User) => {
      try {
        setLoading(true);
        
        // Query directa sin verificaciones adicionales
        const { data: profile, error } = await supabase
          .from('profiles')
          .select("*")
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error obteniendo perfil:', error);
          closeLogout();
          return;
        }
        
        if (profile && isMounted) {
          const userData: IUser = {
            id: user.id,
            email: user.email!,
            name: profile.full_name || user.user_metadata?.name || '',
            role: profile.role,
            avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
            created_at: user.created_at,
          };
          
          const profileData: IProfile = {
            id: profile.id,
            user_id: profile.user_id || profile.id, // fallback si no existe user_id
            email: profile.email,
            full_name: profile.full_name,
            role: profile.role,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
          };
          
          setAuth(userData, profileData);
        }
      } catch (error) {
        console.error('Error cargando perfil:', error);
        closeLogout();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const initializeAuth = async () => {
      try {
        setLoading(true);

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error obteniendo sesión:', sessionError);
          closeLogout();
          return;
        }

        //Found active session, loading profile...
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          closeLogout();
        }
      } catch (error) {
        console.error('Error inicializando auth:', error);
        closeLogout();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const closeLogout = async () => {
      try {
        setLoading(true);

        await supabase.auth.signOut();
        logout();
      } catch (error) {
        console.error('Error en logout:', error);
      } finally {
        setLoading(false);
      }
    };

    // Listener para cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        switch (event) {
          case 'SIGNED_IN':
            if (session?.user) {
              await loadUserProfile(session.user);
            }
            break;
          
          case 'SIGNED_OUT':
            closeLogout();
            break;
          
          case 'TOKEN_REFRESHED':
            if (session?.user) {
              await loadUserProfile(session.user);
            }
            break;
          
          default:
            break;
        }
      }
    );

    // Solo inicializar después de que el store se haya hidratado
    // Y evitar doble inicialización
    if (hasHydrated && !hasInitialized.current) {
      hasInitialized.current = true;
      initializeAuth();
    }

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setAuth, logout, setLoading, hasHydrated]);

  return <>{children}</>;
};