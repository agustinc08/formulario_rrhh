/*
  Warnings:

  - You are about to drop the `_DependenciaToFormulario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DependenciaToFormulario" DROP CONSTRAINT "_DependenciaToFormulario_A_fkey";

-- DropForeignKey
ALTER TABLE "_DependenciaToFormulario" DROP CONSTRAINT "_DependenciaToFormulario_B_fkey";

-- AlterTable
ALTER TABLE "Formulario" ADD COLUMN     "dependenciaId" INTEGER;

-- DropTable
DROP TABLE "_DependenciaToFormulario";

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
