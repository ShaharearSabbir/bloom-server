-- DropIndex
DROP INDEX "Tutor_categoryId_key";

-- CreateIndex
CREATE INDEX "Tutor_userId_categoryId_idx" ON "Tutor"("userId", "categoryId");
