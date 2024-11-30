import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ui/use-toast";
import WaveBackground from "../components/WaveBackground";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur WalletVision !",
      });
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>

      {/* Header */}
      <div className="relative z-20">
        <LandingNav />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Connexion
            </h2>
            <p className="mt-2 text-gray-400">
              Accédez à votre tableau de bord WalletVision
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-gray-400">
            <span>Pas encore de compte ? </span>
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Créer un compte
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
