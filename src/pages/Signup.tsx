import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import WaveBackground from "../components/WaveBackground";
import GradientBackground from "../components/GradientBackground";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.firstName.trim()) {
      setError("Veuillez entrer votre nom");
      return;
    }
    if (!formData.email.trim()) {
      setError("Veuillez entrer votre adresse email");
      return;
    }
    if (!formData.password) {
      setError("Veuillez entrer un mot de passe");
      return;
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (!formData.acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation");
      return;
    }

    try {
      setLoading(true);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName
          }
        }
      });

      if (signUpError) throw signUpError;

      // Créer le profil utilisateur
      if (data.user) {
        const now = new Date().toISOString();
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            first_name: formData.firstName,
            email: formData.email,
            updated_at: now,
            created_at: now
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw profileError;
        }
      }

      // Redirect to home page after successful signup
      navigate("/", { replace: true });
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      <GradientBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <LandingNav />

        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center p-4 pt-20">
          <div className="w-full max-w-md space-y-8 bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
            <div>
              <h2 className="text-3xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Créer un compte
              </h2>
              <p className="text-gray-400 text-center mb-8">
                Rejoignez des milliers d'investisseurs qui utilisent déjà WalletVision pour développer leur portefeuille
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-300">
                  J'accepte les <a href="#" className="text-blue-400 hover:text-blue-300">conditions d'utilisation</a>
                </label>
              </div>

              {error && (
                <div className="text-red-400 text-sm mt-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Création..." : "S'inscrire"}
              </button>
            </form>

            <div className="text-center text-sm">
              <p className="text-gray-300">
                Déjà un compte ?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
