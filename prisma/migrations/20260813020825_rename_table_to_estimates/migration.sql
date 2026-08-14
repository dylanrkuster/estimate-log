/*
  Warnings:

  - You are about to drop the `Estimate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Estimate";

-- CreateTable
CREATE TABLE "estimates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "projected_minutes" INTEGER NOT NULL,
    "projected_reasoning" TEXT,
    "actual_minutes" INTEGER,
    "actual_reasoning" TEXT,

    CONSTRAINT "estimates_pkey" PRIMARY KEY ("id")
);
