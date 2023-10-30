/*
  Warnings:

  - Made the column `tipoRespuestaId` on table `Respuesta` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Respuesta" DROP CONSTRAINT "Respuesta_tipoRespuestaId_fkey";

-- AlterTable
ALTER TABLE "Respuesta" ALTER COLUMN "tipoRespuestaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_tipoRespuestaId_fkey" FOREIGN KEY ("tipoRespuestaId") REFERENCES "TipoRespuesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
