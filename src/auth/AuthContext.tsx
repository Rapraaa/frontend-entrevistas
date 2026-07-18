import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { http, getToken, setToken, clearToken } from '../lib/api';
import type { JwtUser } from '../lib/types';

type AuthResponse = { access_token: string };

export type RegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  user: JwtUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

function decodeToken(token: string | null): JwtUser | null {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const parsed = JSON.parse(json) as JwtUser;
    return { id: parsed.id, email: parsed.email, role: parsed.role };
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<JwtUser | null>(() => decodeToken(getToken()));

  const applyToken = (token: string) => {
    setToken(token);
    setUser(decodeToken(token));
  };

  const login = async (email: string, password: string) => {
    const { data } = await http.post<AuthResponse>('/auth/login', { email, password });
    applyToken(data.access_token);
  };

  const register = async (input: RegisterInput) => {
    const { data } = await http.post<AuthResponse>('/auth/register', input);
    applyToken(data.access_token);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
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
