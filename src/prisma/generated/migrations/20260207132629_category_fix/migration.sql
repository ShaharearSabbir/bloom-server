/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable

-- 1. Manually drop the foreign key constraint that is blocking the change
ALTER TABLE "Tutor" DROP CONSTRAINT IF EXISTS "Tutor_categoryId_fkey";

-- 2. Now the original migration code can run without errors
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey";

