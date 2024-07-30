-- CreateEnum
CREATE TYPE "FakerStatus" AS ENUM ('relationship', 'complicated', 'single');

-- CreateTable
CREATE TABLE "Faker" (
    "id" TEXT NOT NULL,
    "indexId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "visits" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "status" "FakerStatus" NOT NULL DEFAULT 'single',

    CONSTRAINT "Faker_pkey" PRIMARY KEY ("id")
);
