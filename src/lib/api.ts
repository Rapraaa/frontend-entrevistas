import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
const TOKEN_KEY = 'sim_token';

export const API_BASE_URL = BASE_URL;

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const RUTAS_PUBLICAS = ['/', '/login', '/registro', '/publico', '/auth/callback'];

function esRutaPrivada(pathname: string): boolean {
  return !RUTAS_PUBLICAS.some(
    (ruta) => pathname === ruta || (ruta !== '/' && pathname.startsWith(`${ruta}/`)),
  );
}

export const http = axios.create({ baseURL: BASE_URL });

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const url = error.config?.url ?? '';
      const esLoginORegistro = url.includes('/auth/login') || url.includes('/auth/register');

      // Sesión expirada o token inválido: limpiamos y mandamos a iniciar sesión.
      // (No aplica al propio login/registro, donde un 401 significa credenciales malas.)
      if (status === 401 && !esLoginORegistro) {
        clearToken();
        if (esRutaPrivada(window.location.pathname)) {
          window.location.assign('/login');
        }
      }

      const data = error.response?.data as { message?: string | string[] } | undefined;
      const message = Array.isArray(data?.message)
        ? data.message.join(', ')
        : (data?.message ?? error.message);
      return Promise.reject(new ApiError(status, message));
    }
    return Promise.reject(new ApiError(0, 'Error de conexión'));
  },
);
