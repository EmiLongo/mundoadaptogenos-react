// src/hooks/useAuth.js
import { useState } from 'react';
import { supabase } from '@/api/apiClient';
import { toast } from 'react-toastify';
import { IUser, ILoginData, Role } from '@/types/AuthTypes';
import { User } from '@supabase/supabase-js';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { logout, setAuth } = useUserStore();

  // Convertir SupabaseUser a IUser
  const mapSupabaseUserToIUser = (supabaseUser: User): IUser => {
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata.full_name,
      email: supabaseUser.email!,
      role: supabaseUser.app_metadata?.role as Role || Role.CLIENT,
      created_at: supabaseUser.created_at,
      email_confirmed_at: supabaseUser.email_confirmed_at,
      phone: supabaseUser.phone,
    };
  };

  // Sincronizar con Zustand store
  const syncWithStore = (supabaseUser: User) => {
    const mappedUser = mapSupabaseUserToIUser(supabaseUser);
    setAuth(mappedUser);
  };

  // FUNCIÓN DE LOGIN
  const signIn = async (loginData: ILoginData) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        syncWithStore(data.user);
        toast.success('Login exitoso')
          
          // Redirigir según el rol
          if (data.user.app_metadata?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
          
          return { success: true, user: data.user };
      }
      
      return { success: false, error: 'No se pudo obtener el perfil' };
      
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'Error al iniciar sesión');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // FUNCIÓN DE LOGIN CON GOOGLE
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`
        }
      });
      console.log(data, error);
      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast.error('Error al iniciar sesión con Google');
      return { success: false, error: error.message };
    }
  };

  // Función para cerrar sesión
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    logout();
    toast.success('Sesión cerrada correctamente');
    window.location.href = '/';
    
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    toast.error('Error al cerrar sesión');
    return { success: false, error };
  }
};

  // TODO: FUNCIÓN PARA ACTUALIZAR PERFIL


  return {
    // State
    user,
    loading,
    
    // Actions
    signIn,          
    signInWithGoogle,
    signOut,   
  };
};