import { Link, useNavigate } from 'react-router-dom';
import { Wallet, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      // Récupérer le prénom depuis la table des profils
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // Fallback sur l'email si erreur
          const emailName = user.email?.split('@')[0] || '';
          setFirstName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
        } else if (data) {
          setFirstName(data.first_name);
        }

        // Générer l'avatar basé sur l'email
        const seed = user.email;
        setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed || '')}`);
      };

      fetchProfile();
    }
  }, [user?.id, user?.email]);

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
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                    title="Edit Profile"
                  >
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-sky-200">{firstName}</span>
                  </Link>
                </div>
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
          </div>
        </div>
      </div>
    </nav>
  );
}