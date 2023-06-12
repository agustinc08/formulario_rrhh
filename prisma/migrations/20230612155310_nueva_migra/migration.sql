/*
  Warnings:

  - You are about to drop the column `seccionId` on the `Inicio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inicio" DROP CONSTRAINT "Inicio_seccionId_fkey";

-- AlterTable
ALTER TABLE "Inicio" DROP COLUMN "seccionId";
