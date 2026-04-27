import prisma from "../../lib/prisma";
import { UserRole } from "../../prisma/generated/prisma/enums";
import { UpdateStudentPayload } from "./student.validation";

const getProfile = async (userId: string) => {
  const student = await prisma.user.findFirst({
    where: {
      id: userId,
      role: UserRole.STUDENT,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      image: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

const updateProfile = async (userId: string, payload: UpdateStudentPayload) => {
  const isExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!isExist) {
    throw new Error("User not found");
  }

  const student = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      image: true,
    },
  });
  return student;
};

const studentService = { getProfile, updateProfile };
export default studentService;
