// src/shared/hooks/AuthProvider.tsx
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { IProfile, IUser } from "@/types/AuthTypes";
import { supabase } from "@/api/apiClient";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, logout, setLoading } = useUserStore();

  // Cargar sesión inicial
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      // Obtener sesión actual
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error obteniendo sesión:", error);
          logout();
          return;
        }
        if (session?.user) {
          console.log("Session found, loading profile...");
          await loadUserProfile(session.user.id);
        } else {
          console.log("No hay sesión activa, cerrando sesión...");
          logout();
        }
      } catch (error) {
        console.error("Error obteniendo sesión:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Escuchar cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          logout();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Función para cargar el perfil desde la DB
  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (profile) {
        const userData: IUser = {
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          role: profile.role,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
        };

        setAuth(userData, profile as IProfile);
      }
    } catch (err) {
      console.error("Unexpected error loading profile:", err);
    }
  };

  return children;
};