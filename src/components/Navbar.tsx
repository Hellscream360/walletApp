import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ui/use-toast";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (user?.id) {
      // Récupérer le prénom depuis la table des profils
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          // Fallback sur l'email si erreur
          const emailName = user.email?.split("@")[0] || "";
          setFirstName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
        } else if (data) {
          setFirstName(data.first_name);
        }

        // Générer l'avatar basé sur l'email
        const seed = user.email;
        setAvatarUrl(
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
            seed || ""
          )}`
        );
      };

      fetchProfile();
    }
  }, [user?.id, user?.email]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Successfully signed out",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error signing out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                WalletVision
              </span>
            </div>
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
                    <span className="text-sm font-medium text-gray-700 dark:text-sky-200">
                      {firstName}
                    </span>
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
