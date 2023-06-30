/*
  Warnings:

  - Added the required column `formularioId` to the `TipoRespuesta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TipoRespuesta" ADD COLUMN     "formularioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TipoRespuesta" ADD CONSTRAINT "TipoRespuesta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
