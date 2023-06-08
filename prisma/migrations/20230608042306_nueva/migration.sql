/*
  Warnings:

  - Added the required column `rol` to the `Dependencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dependencia" ADD COLUMN     "rol" TEXT NOT NULL;
