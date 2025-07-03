// src/api/authApi.ts
import apiClient from './apiClient';
import { authEndpoint } from './utils';

// Autentica a un usuario con sus credenciales y devuelve un token de autenticación.
export const login = ( loginData: LoginData ) => {
  return apiClient.post<LoginResponse>(`${authEndpoint}/login`, loginData );
};

// Registra un nuevo usuario en el sistema con los detalles proporcionados.
export const register = ( registerData: RegisterData ) => {
  return apiClient.post<RegisterResponse>(`${authEndpoint}/register`, registerData );
};

export const registerAdmin = ( registerAdminData: RegisterAdminData ) => {
  return apiClient.post<RegisterAdminResponse>(`${authEndpoint}/register-admin`, registerAdminData );
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: string;
  user: User;
};

export type RegisterAdminData = {
  name: string;
  email: string;
  password: string;
}

export type RegisterAdminResponse = {
  token: string;
  user: User;
};