/*
  Warnings:

  - Added the required column `dependenciaId` to the `Comentario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comentario" ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
