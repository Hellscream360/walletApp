import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WalletView from './pages/WalletView';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import Visualization from './pages/features/Visualization';
import Backtesting from './pages/features/Backtesting';
import Community from './pages/features/Community';
import AIStrategies from './pages/features/AIStrategies';
import Reporting from './pages/features/Reporting';
import Pricing from './pages/Pricing';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Motif géométrique animé */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Lignes diagonales */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 0%, transparent 48%, rgba(var(--color-primary-500) / 0.03) 49%, rgba(var(--color-primary-500) / 0.03) 51%, transparent 52%, transparent 100%)`,
          backgroundSize: '30px 30px',
        }}></div>

        {/* Hexagones animés */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' stroke-width='2' stroke='%23000' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'backgroundMove 30s linear infinite',
          }}
        ></div>

        {/* Points brillants */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Vagues de fond */}
        <div className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.03]"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(var(--color-primary-500) / 0.1) 100%)`,
            animation: 'waveMove 15s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* Style global pour les animations */}
      <style jsx global>{`
        @keyframes backgroundMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 60px 60px;
          }
        }

        @keyframes waveMove {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Contenu de l'application */}
      <div className="relative">
        {user && <Navbar />}
        <main className={user ? "container mx-auto px-4 py-8" : ""}>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                ) : (
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                )
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/wallets/:id"
              element={
                <PrivateRoute>
                  <WalletView />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {/* Public Routes */}
            <Route path="/features/visualization" element={<Visualization />} />
            <Route path="/features/backtesting" element={<Backtesting />} />
            <Route path="/features/community" element={<Community />} />
            <Route path="/features/ai-strategies" element={<AIStrategies />} />
            <Route path="/features/reporting" element={<Reporting />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
          </Routes>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}