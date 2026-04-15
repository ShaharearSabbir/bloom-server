import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

const studentsData = [
  {
    name: "Julian Foye",
    email: "julian.f@example.com",
    password: "Password123!",
  },
  {
    name: "Nadia Volkov",
    email: "nadia.v@example.com",
    password: "Password123!",
  },
  {
    name: "Amara Okoro",
    email: "amara.o@example.com",
    password: "Password123!",
  },
  { name: "Leo Schmidt", email: "leo.s@example.com", password: "Password123!" },
  {
    name: "Hina Tanaka",
    email: "hina.t@example.com",
    password: "Password123!",
  },
  {
    name: "Caleb Rivers",
    email: "caleb.r@example.com",
    password: "Password123!",
  },
  {
    name: "Sloane Baxter",
    email: "sloane.b@example.com",
    password: "Password123!",
  },
  {
    name: "Elias Thorne",
    email: "elias.t@example.com",
    password: "Password123!",
  },
  { name: "Maya Gupta", email: "maya.g@example.com", password: "Password123!" },
  {
    name: "Felix Zhang",
    email: "felix.z@example.com",
    password: "Password123!",
  },
  { name: "Isla Moore", email: "isla.m@example.com", password: "Password123!" },
  {
    name: "Arjun Nair",
    email: "arjun.n@example.com",
    password: "Password123!",
  },
  { name: "Zoe Kastner", email: "zoe.k@example.com", password: "Password123!" },
  {
    name: "Oscar Wilde",
    email: "oscar.w@example.com",
    password: "Password123!",
  },
  { name: "Ruby Vance", email: "ruby.v@example.com", password: "Password123!" },
  { name: "Hugo Frost", email: "hugo.f@example.com", password: "Password123!" },
  {
    name: "Clara Oswald",
    email: "clara.o@example.com",
    password: "Password123!",
  },
  {
    name: "Silas Vane",
    email: "silas.v@example.com",
    password: "Password123!",
  },
  {
    name: "Jade Nguyen",
    email: "jade.n@example.com",
    password: "Password123!",
  },
  { name: "Koa Smith", email: "koa.s@example.com", password: "Password123!" },
];

async function seedStudents() {
  console.log("🌱 Starting Student Seeding...");

  for (const student of studentsData) {
    try {
      // 1. Register User via Better-Auth API
      const { user } = await auth.api.signUpEmail({
        body: {
          email: student.email,
          password: student.password,
          name: student.name,
          role: "STUDENT",
        },
      });

      if (!user) {
        console.error(`❌ Failed to register ${student.email}`);
        continue;
      }

      // 2. Manually verify the email directly in the database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
        },
      });

      console.log(`✅ Seeded & Verified Student: ${student.name} (${user.id})`);
    } catch (err) {
      console.error(`⚠️ Error processing ${student.email}:`, err);
    }
  }

  console.log("🏁 Student seeding complete!");
}

seedStudents();
