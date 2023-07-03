-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "tipoRespuestaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_tipoRespuestaId_fkey" FOREIGN KEY ("tipoRespuestaId") REFERENCES "TipoRespuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
