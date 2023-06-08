/*
  Warnings:

  - The `rol` column on the `Dependencia` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('dependencia', 'admin');

-- AlterTable
ALTER TABLE "Dependencia" DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'dependencia';
