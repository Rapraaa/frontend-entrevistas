import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';
import { AuthCallback } from './pages/AuthCallback';
import { NotFound } from './pages/NotFound';

// Las pantallas pesadas (gráficos, formularios, editor) se cargan bajo demanda:
// así el bundle inicial no arrastra recharts ni react-hook-form.
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const SetupPage = lazy(() =>
  import('./pages/SetupPage').then((m) => ({ default: m.SetupPage })),
);
const InterviewPage = lazy(() =>
  import('./pages/InterviewPage').then((m) => ({ default: m.InterviewPage })),
);
const ResultPage = lazy(() =>
  import('./pages/ResultPage').then((m) => ({ default: m.ResultPage })),
);
const Profile = lazy(() =>
  import('./pages/Profile').then((m) => ({ default: m.Profile })),
);
const CatalogPage = lazy(() =>
  import('./pages/admin/CatalogPage').then((m) => ({ default: m.CatalogPage })),
);
const PublicCatalog = lazy(() =>
  import('./pages/PublicCatalog').then((m) => ({ default: m.PublicCatalog })),
);
const PublicCatalogDetail = lazy(() =>
  import('./pages/PublicCatalogDetail').then((m) => ({ default: m.PublicCatalogDetail })),
);

function Cargando() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base font-mono text-muted">
      Cargando_
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Cargando />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/publico/:slug" element={<PublicCatalog />} />
          <Route path="/publico/:slug/:id" element={<PublicCatalogDetail />} />

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/interview/:id" element={<InterviewPage />} />
            <Route path="/resultado/:id" element={<ResultPage />} />
            <Route path="/admin/catalogos/:slug" element={<CatalogPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
