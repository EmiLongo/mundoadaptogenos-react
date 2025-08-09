// src/shared/types/AuthTypes.ts
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}
export interface IProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  avatar_url: string | null;
  created_at: string;
  // Datos adicionales de Supabase si los necesitas
  email_confirmed_at?: string | null;
  phone?: string | null;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Respuestas de Supabase (opcionales, para tipado)
export interface ISupabaseAuthResponse {
  user: SupabaseUser | null;
  session: Session | null;
}

export interface IAuthState {
  user: IUser | null;
  profile: IProfile | null;
  loading: boolean;
}