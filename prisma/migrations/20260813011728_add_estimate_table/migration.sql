-- CreateTable
CREATE TABLE "Estimate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "projected" INTEGER NOT NULL,
    "actual" INTEGER NOT NULL,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);
