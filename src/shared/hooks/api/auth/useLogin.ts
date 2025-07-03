// src/hooks/useLogin.ts
import { useState, useCallback } from 'react';
import { login, LoginData, LoginResponse } from '@/api/authApi';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/useUserStore';


const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (loginData: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(loginData);
      console.log(response);
      console.log(response.data);
      setUser(response.data);
      useUserStore.getState().setUser(response.data.user, response.data.token);

      toast.success('Inicio de sesión exitoso');
    } catch (err: unknown) {
      console.error(err);
      setError('Error al iniciar sesión');
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    user,
    error,
    handleLogin,
  };
};

export default useLogin;
