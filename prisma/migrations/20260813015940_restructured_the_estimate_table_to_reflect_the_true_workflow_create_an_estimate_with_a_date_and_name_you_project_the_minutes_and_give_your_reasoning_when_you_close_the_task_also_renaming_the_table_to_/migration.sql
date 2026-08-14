/*
  Warnings:

  - You are about to drop the column `diff_reasoning` on the `Estimate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Estimate" DROP COLUMN "diff_reasoning",
ADD COLUMN     "actual_reasoning" TEXT,
ADD COLUMN     "projected_reasoning" TEXT;
