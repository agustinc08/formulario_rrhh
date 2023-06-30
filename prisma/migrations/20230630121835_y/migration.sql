/*
  Warnings:

  - You are about to drop the column `dependenciaId` on the `Formulario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Formulario" DROP CONSTRAINT "Formulario_dependenciaId_fkey";

-- AlterTable
ALTER TABLE "Formulario" DROP COLUMN "dependenciaId";

-- CreateTable
CREATE TABLE "_DependenciaToFormulario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DependenciaToFormulario_AB_unique" ON "_DependenciaToFormulario"("A", "B");

-- CreateIndex
CREATE INDEX "_DependenciaToFormulario_B_index" ON "_DependenciaToFormulario"("B");

-- AddForeignKey
ALTER TABLE "_DependenciaToFormulario" ADD CONSTRAINT "_DependenciaToFormulario_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciaToFormulario" ADD CONSTRAINT "_DependenciaToFormulario_B_fkey" FOREIGN KEY ("B") REFERENCES "Formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
