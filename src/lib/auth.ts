import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { env } from "../config";
import { generateVerificationEmail } from "../utils/generateVerificationEmail";
import sendEmail from "../utils/sendEmail";
import { getOAuthState } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
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
    sendOnSignUp: true,
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
        console.error("Failed to send verification email:", error);
        throw error;
      }
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const state = await getOAuthState();
          const roleFromSocial = state?.query?.role;

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
