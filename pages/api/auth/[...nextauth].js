import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("url", url);
      return baseUrl;
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const user = { id: 1, name: "User Test", email: "test@example.com" }; // Exemple de réponse utilisateur
        if (
          credentials.username === "test" &&
          credentials.password === "password"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
