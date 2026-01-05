import { type NextAuthConfig, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import UserModel from "@/app/models/User";


interface ExtendedUser extends User {
  _id?: string;
}

interface ExtendedToken extends JWT {
  _id?: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const user = await UserModel.findOne({ email: credentials.email as string });

          if (!user) {
            throw new Error("No user found with the given email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (isPasswordCorrect) {
            return {
              id: user._id?.toString() || "",
              _id: user._id?.toString(),
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
            };
          } else {
            throw new Error("Invalid password");
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Authentication failed";
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Save Google OAuth users to database on first login
      if (account?.provider === "google" && user.email) {
        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          
          if (!existingUser) {
            // Extract first and last name from Google profile
            const nameParts = (user.name || "").split(" ");
            const firstName = nameParts[0] || "User";
            const lastName = nameParts.slice(1).join(" ") || "";

            await UserModel.create({
              firstName,
              lastName,
              email: user.email,
              phone: "",
              password: "", 
              avatar: user.image || "",
            });
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          // Still allow sign in even if DB save fails
        }
      }
      return true;
    },
    async session({ session, token }: { session: ExtendedSession; token: ExtendedToken }) {
      if (token) {
        session.user._id = token._id;
      }
      return session;
    },
    async jwt({ token, user }: { token: ExtendedToken; user?: ExtendedUser }) {
      if (user) {
        // For OAuth users, fetch _id from database
        if (!user._id && user.email) {
          const dbUser = await UserModel.findOne({ email: user.email });
          if (dbUser) {
            token._id = dbUser._id?.toString();
          }
        } else {
          token._id = user._id;
        }
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
};