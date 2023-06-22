/*
  Warnings:

  - Added the required column `formularioId` to the `Seccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seccion" ADD COLUMN     "formularioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
