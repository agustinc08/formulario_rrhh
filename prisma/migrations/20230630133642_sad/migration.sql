/*
  Warnings:

  - You are about to drop the column `tipoPreguntaId` on the `Formulario` table. All the data in the column will be lost.
  - Added the required column `formularioId` to the `TipoPregunta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Formulario" DROP CONSTRAINT "Formulario_tipoPreguntaId_fkey";

-- AlterTable
ALTER TABLE "Formulario" DROP COLUMN "tipoPreguntaId";

-- AlterTable
ALTER TABLE "TipoPregunta" ADD COLUMN     "formularioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TipoPregunta" ADD CONSTRAINT "TipoPregunta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
