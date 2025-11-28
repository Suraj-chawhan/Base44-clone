import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../model/User";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  // 🔹 Use JWT strategy with 7 days expiry
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },

  providers: [
    // 🟢 Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 🟣 GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // 🔐 Credentials (local login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error("No user found with this email.");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password.");
        return user;
      },
    }),
  ],

  callbacks: {
    // 🧠 On sign-in (Google/GitHub): ensure DB user exists
    async signIn({ user, account, profile }) {
      await connectDB();
      if (account.provider === "google" || account.provider === "github") {
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name || profile.name || "Unknown",
            email: user.email,
            provider: account.provider,
            isVerified: true,
            plan: "free",
            credits: 3,
          });
        }
      }
      return true;
    },

    // 🧾 JWT token — store all important fields
    async jwt({ token, user }) {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email || user?.email });
      if (dbUser) {
        token.id = dbUser._id.toString();
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.provider = dbUser.provider;
        token.plan = dbUser.plan;
        token.planExpiry = dbUser.planExpiry;
        token.credits = dbUser.credits;
        token.installationId = dbUser.installationId;
      }
      return token;
    },

    // 💾 Session — expose everything except password
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          provider: token.provider,
          plan: token.plan,
          planExpiry: token.planExpiry,
          credits: token.credits,
          installationId: token.installationId,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/editor",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
