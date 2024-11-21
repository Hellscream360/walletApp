import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please log in</p>;

  return <p>Welcome, {session.user?.name}!</p>;
}