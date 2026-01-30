import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { env } from "../config";
import { generateVerificationEmail } from "../utils/generateVerificationEmail";
import sendEmail from "../utils/sendEmail";
// If your Prisma file is located elsewhere, you can change the path

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.FRONTEND_URL],

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
      status: {
        type: "string",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
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
});

export default auth;

type Session = typeof auth.$Infer.Session;
