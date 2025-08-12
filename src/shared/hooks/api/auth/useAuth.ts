// src/hooks/useAuth.js
import { useState } from 'react';
import { supabase } from '@/api/apiClient';
import { toast } from 'react-toastify';
import { IProfile, IUser, ILoginData } from '@/types/AuthTypes';
import { User } from '@supabase/supabase-js';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { logout, setAuth } = useUserStore();

  // Convertir SupabaseUser a IUser
  const mapSupabaseUserToIUser = (supabaseUser: User, userProfile: IProfile): IUser => {
    return {
      id: supabaseUser.id,
      name: userProfile.full_name,
      email: supabaseUser.email!,
      role: userProfile.role,
      avatar_url: userProfile.avatar_url,
      created_at: supabaseUser.created_at,
      email_confirmed_at: supabaseUser.email_confirmed_at,
      phone: supabaseUser.phone,
    };
  };

  // Obtener perfil del usuario
  const fetchProfile = async (userId: string): Promise<IProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Sincronizar con Zustand store
  const syncWithStore = (supabaseUser: User, userProfile: IProfile) => {
    const mappedUser = mapSupabaseUserToIUser(supabaseUser, userProfile);
    setAuth(mappedUser, userProfile);
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
        const userProfile = await fetchProfile(data.user.id);
        if (userProfile) {
          syncWithStore(data.user, userProfile);
          toast.success('Login exitoso')
          
          // Redirigir según el rol
          if (userProfile.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
          
          return { success: true, user: data.user, profile: userProfile };
        }
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

  // FUNCIÓN PARA ACTUALIZAR PERFIL
  const updateProfile = async (updates: Partial<IProfile>) => {
    if (!user || !profile) return { success: false, error: 'No hay usuario autenticado' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      
      // Actualizar store
      const mappedUser = mapSupabaseUserToIUser(user, updatedProfile);
      setAuth(mappedUser, updatedProfile);
      
      toast.success('Perfil actualizado correctamente');
      return { success: true, profile: updatedProfile };
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar perfil');
      return { success: false, error: error.message };
    }
  };

  return {
    // State
    user,
    profile,
    loading,
    
    // Getters
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isClient: profile?.role === 'client',
    
    // Actions
    signIn,          
    signInWithGoogle,
    signOut,
    updateProfile,   
  };
};