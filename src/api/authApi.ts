// src/api/authApi.ts
import apiClient from './apiClient';
import { authEndpoint } from './utils';

// Autentica a un usuario con sus credenciales y devuelve un token de autenticación.
export const login = ( loginData: ILoginData ) => {
  return apiClient.post<ILoginResponse>(`${authEndpoint}/login`, loginData );
};

// Registra un nuevo usuario en el sistema con los detalles proporcionados.
export const register = ( registerData: IRegisterData ) => {
  return apiClient.post<IRegisterResponse>(`${authEndpoint}/register`, registerData );
};

export const registerAdmin = ( registerAdminData: IRegisterAdminData ) => {
  return apiClient.post<IRegisterAdminResponse>(`${authEndpoint}/register-admin`, registerAdminData );
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
};

export interface ILoginData {
  email: string;
  password: string;
};

export interface ILoginResponse {
  token: string;
  user: IUser;
};

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
};

export interface IRegisterResponse {
  token: string;
  user: IUser;
};

export interface IRegisterAdminData {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterAdminResponse {
  token: string;
  user: IUser;
};