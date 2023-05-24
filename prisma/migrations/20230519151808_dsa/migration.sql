/*
  Warnings:

  - You are about to drop the column `tieneRespuesta` on the `Pregunta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pregunta" DROP COLUMN "tieneRespuesta",
ADD COLUMN     "tieneExpresion" BOOLEAN NOT NULL DEFAULT false;
