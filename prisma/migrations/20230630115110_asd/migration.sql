/*
  Warnings:

  - Made the column `dependenciaId` on table `Formulario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Formulario" DROP CONSTRAINT "Formulario_dependenciaId_fkey";

-- AlterTable
ALTER TABLE "Formulario" ALTER COLUMN "dependenciaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
