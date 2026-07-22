import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      loginWithToken(token);
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [params, loginWithToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base font-mono text-fg">
      Iniciando sesión con Google_
    </div>
  );
}
