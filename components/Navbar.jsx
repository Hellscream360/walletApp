import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between">
      <h1 className="text-xl">Wallet App</h1>
      <div>
        {session ? (
          <>
            <span className="mr-4">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <a href="/auth/signin" className="text-blue-400 hover:underline">
            Connexion
          </a>
        )}
      </div>
    </nav>
  );
}