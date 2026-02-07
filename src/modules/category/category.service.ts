import prisma from "../../lib/prisma";
import { CategoryCreateInput } from "../../prisma/generated/prisma/models";

const createCategory = async (payload: CategoryCreateInput) => {
  const category = await prisma.category.create({ data: payload });
  return category;
};

const getCategories = async () => {
  const category = await prisma.category.findMany();
  return category;
};

const categoryService = { createCategory, getCategories };

export default categoryService;
