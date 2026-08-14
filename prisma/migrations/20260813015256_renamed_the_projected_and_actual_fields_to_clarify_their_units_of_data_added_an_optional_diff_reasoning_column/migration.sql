/*
  Warnings:

  - You are about to drop the column `actual` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `projected` on the `Estimate` table. All the data in the column will be lost.
  - Added the required column `projected_minutes` to the `Estimate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estimate" DROP COLUMN "actual",
DROP COLUMN "projected",
ADD COLUMN     "actual_minutes" INTEGER,
ADD COLUMN     "diff_reasoning" TEXT,
ADD COLUMN     "projected_minutes" INTEGER NOT NULL;
