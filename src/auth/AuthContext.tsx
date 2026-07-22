import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { http, getToken, setToken, clearToken } from '../lib/api';
import { getUser, type UserProfile } from '../lib/users';
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
  /** Perfil completo (incluye la foto). Se carga tras autenticarse. */
  profile: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  loginWithToken: (token: string) => void;
  refreshProfile: () => Promise<void>;
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
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const refreshProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    try {
      setProfile(await getUser(user.id));
    } catch {
      setProfile(null);
    }
  }, [user?.id]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const applyToken = useCallback((token: string) => {
    setToken(token);
    setUser((anterior) => {
      const siguiente = decodeToken(token);
      if (anterior?.id === siguiente?.id && anterior?.role === siguiente?.role) {
        return anterior;
      }
      return siguiente;
    });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await http.post<AuthResponse>('/auth/login', { email, password });
      applyToken(data.access_token);
    },
    [applyToken],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      const { data } = await http.post<AuthResponse>('/auth/register', input);
      applyToken(data.access_token);
    },
    [applyToken],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: !!user,
      user,
      profile,
      isAdmin: user?.role === 'admin',
      login,
      register,
      loginWithToken: applyToken,
      refreshProfile,
      logout,
    }),
    [user, profile, login, register, applyToken, refreshProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}
