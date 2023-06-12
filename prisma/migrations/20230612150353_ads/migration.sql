/*
  Warnings:

  - You are about to drop the column `introduccion` on the `Inicio` table. All the data in the column will be lost.
  - You are about to drop the column `objetivo` on the `Inicio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inicio" DROP COLUMN "introduccion",
DROP COLUMN "objetivo";
