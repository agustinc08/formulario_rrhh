/*
  Warnings:

  - You are about to drop the column `tieneComentario` on the `Respuesta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "tieneComentario" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Respuesta" DROP COLUMN "tieneComentario";
