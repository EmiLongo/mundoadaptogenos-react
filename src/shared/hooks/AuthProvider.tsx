// src/shared/hooks/AuthProvider.tsx
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { IUser, Role } from "@/types/AuthTypes";
import { supabase } from "@/api/apiClient";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, logout } = useUserStore();

  // Cargar sesión inicial
  useEffect(() => {
    // Escuchar cambios de autenticación
    supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Event: ${event}`);
        if (session?.user) {
        const userData: IUser = {
          id: session?.user.id,
          name: session?.user.user_metadata.full_name,
          email: session?.user.email,
          phone: session?.user.phone,
          role: session?.user.app_metadata?.role as Role || Role.CLIENT,
          created_at: session?.user.created_at,
        };

        setAuth(userData);
        } else {
          logout();
        }
      }
    );
  }, []);

  return children;
};