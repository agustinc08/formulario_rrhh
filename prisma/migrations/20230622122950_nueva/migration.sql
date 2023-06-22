-- AlterTable
ALTER TABLE "Formulario" ADD COLUMN     "inicioId" INTEGER;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_inicioId_fkey" FOREIGN KEY ("inicioId") REFERENCES "Inicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
