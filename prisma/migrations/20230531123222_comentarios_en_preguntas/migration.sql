-- AlterTable
ALTER TABLE "Comentario" ADD COLUMN     "preguntaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
