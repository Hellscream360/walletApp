import { Link, useNavigate } from 'react-router-dom';
import { Wallet, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-blue-600 dark:text-sky-200" />
            <span className="hidden sm:block text-xl font-bold text-gray-900 dark:text-sky-100">WalletVision</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-sky-200">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 dark:text-sky-200 dark:hover:text-sky-400 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 dark:text-sky-200 dark:hover:text-sky-400 font-medium"
              >
                Sign In
              </Link>
            )}
            <ThemeToggle />
            <div>
        </div>
          </div>
        </div>
      </div>
    </nav>
  );
}