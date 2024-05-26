/*
  Warnings:

  - You are about to drop the column `short` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "urls_short_key";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "short",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "urls_code_key" ON "urls"("code");
