-- DropForeignKey
ALTER TABLE "Formulario" DROP CONSTRAINT "Formulario_dependenciaId_fkey";

-- AlterTable
ALTER TABLE "Formulario" ALTER COLUMN "dependenciaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
