import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    // Si déjà connecté, redirection vers la page d'accueil ou tableau de bord
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Se connecter</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connexion avec Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Connexion avec GitHub
        </button>
        <button
          onClick={() => signIn("facebook")}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          Connexion avec Facebook
        </button>
      </div>
      <p className="mt-4 text-gray-500">
        Pas encore de compte ? Créez-en un en vous connectant via un provider.
      </p>
    </div>
  );
}