/*
  Warnings:

  - Added the required column `edificio` to the `Dependencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `polo` to the `Dependencia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Polo" AS ENUM ('LAVALLE', 'INMIGRANTES');

-- CreateEnum
CREATE TYPE "Edificio" AS ENUM ('Lavalle_1220', 'Talcahuano_790', 'Uruguay_910');

-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'usuario';

-- AlterTable
ALTER TABLE "Dependencia" ADD COLUMN     "edificio" "Edificio" NOT NULL,
ADD COLUMN     "polo" "Polo" NOT NULL;
