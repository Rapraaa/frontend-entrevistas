import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { api, getToken, setToken, clearToken } from '../lib/api';

type AuthResponse = { access_token: string };

export type RegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTok] = useState<string | null>(getToken());

  const login = async (email: string, password: string) => {
    const { access_token } = await api<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(access_token);
    setTok(access_token);
  };

  const register = async (input: RegisterInput) => {
    const { access_token } = await api<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    setToken(access_token);
    setTok(access_token);
  };

  const logout = () => {
    clearToken();
    setTok(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}
