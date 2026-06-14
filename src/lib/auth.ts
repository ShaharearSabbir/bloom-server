import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { generateVerificationEmail } from "../utils/generateVerificationEmail";
import sendEmail from "../utils/sendEmail";
import { getOAuthState } from "better-auth/api";
import { env } from "../config/dotenv";
import { oAuthProxy } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.FRONTEND_URL,
  trustedOrigins: [env.FRONTEND_URL, env.BETTER_AUTH_URL],

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
      status: {
        type: "string",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      const { html, text } = generateVerificationEmail(
        user.name,
        verificationUrl,
      );

      try {
        await sendEmail(user.email, "Verify your email address", html, text);
      } catch (error) {
        throw error;
      }
    },
  },

  advanced: {
    cookies: {
      session_token: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
      state: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
    },
  },

  plugins: [oAuthProxy()],

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const state = await getOAuthState();
          const roleFromSocial = state?.role;

          return {
            data: {
              ...user,

              role: roleFromSocial || user.role || "STUDENT",
              status: user.status || "ACTIVE",
            },
          };
        },
      },
    },
  },
});
