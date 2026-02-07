import { User } from "better-auth/types";
import prisma from "../lib/prisma";
import { UserRole } from "../prisma/generated/prisma/enums";
import auth from "../lib/auth";

const seedAdmin = async () => {
  try {
    console.log("creating admin...");
    const adminData = {
      body: {
        name: "Admin",
        email: "admin@bloom.com",
        password: "admin123",
        role: UserRole.ADMIN,
      },
    };

    const res = await auth.api.signUpEmail(adminData);

    const userData = res.user as User;

    console.log("verifying email address...");

    await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        emailVerified: true,
      },
    });

    console.log("admin created");
  } catch (error) {
    console.error(error);
  }
};

seedAdmin();
