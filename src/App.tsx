import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import WalletView from './pages/WalletView';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import Visualization from './pages/features/Visualization';
import Backtesting from './pages/features/Backtesting';
import Community from './pages/features/Community';
import AIStrategies from './pages/features/AIStrategies';
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
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
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
                <Register />
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
        </Routes>
      </main>
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