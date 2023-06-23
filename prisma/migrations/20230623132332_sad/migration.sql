/*
  Warnings:

  - You are about to drop the column `formularioId` on the `Dependencia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dependencia" DROP CONSTRAINT "Dependencia_formularioId_fkey";

-- AlterTable
ALTER TABLE "Dependencia" DROP COLUMN "formularioId";

-- CreateTable
CREATE TABLE "_FormularioDependencia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FormularioDependencia_AB_unique" ON "_FormularioDependencia"("A", "B");

-- CreateIndex
CREATE INDEX "_FormularioDependencia_B_index" ON "_FormularioDependencia"("B");

-- AddForeignKey
ALTER TABLE "_FormularioDependencia" ADD CONSTRAINT "_FormularioDependencia_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormularioDependencia" ADD CONSTRAINT "_FormularioDependencia_B_fkey" FOREIGN KEY ("B") REFERENCES "Formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
