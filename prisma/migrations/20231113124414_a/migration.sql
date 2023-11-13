-- DropForeignKey
ALTER TABLE "Respuesta" DROP CONSTRAINT "Respuesta_tipoRespuestaId_fkey";

-- AlterTable
ALTER TABLE "Respuesta" ALTER COLUMN "tipoRespuestaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_tipoRespuestaId_fkey" FOREIGN KEY ("tipoRespuestaId") REFERENCES "TipoRespuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
