import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/use-toast';

interface ProfileData {
  first_name: string;
  email: string;
  avatar_url?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    email: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfileData({
          first_name: data?.first_name || '',
          email: user.email || '',
          avatar_url: data?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email || '')}`
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      // Vérifier que le prénom n'est pas vide
      if (!profileData.first_name.trim()) {
        toast({
          title: "Error",
          description: "First name is required",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: profileData.first_name.trim(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <div className="text-secondary-600 dark:text-secondary-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-50">
            Profile Settings
          </h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={profileData.avatar_url}
              alt="Profile"
              className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-secondary-700 dark:text-secondary-200 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profileData.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary-700 dark:text-secondary-200 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-600 bg-secondary-100 dark:bg-secondary-600 text-secondary-900 dark:text-secondary-50 cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
              Email cannot be changed
            </p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
