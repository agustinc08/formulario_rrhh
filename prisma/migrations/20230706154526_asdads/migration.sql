/*
  Warnings:

  - You are about to drop the column `preguntaId` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `respuestaId` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaId` on the `Formulario` table. All the data in the column will be lost.
  - You are about to drop the column `edad` on the `Formulario` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `Formulario` table. All the data in the column will be lost.
  - You are about to drop the column `inicioId` on the `Formulario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_preguntaId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_respuestaId_fkey";

-- DropForeignKey
ALTER TABLE "Formulario" DROP CONSTRAINT "Formulario_dependenciaId_fkey";

-- DropForeignKey
ALTER TABLE "Formulario" DROP CONSTRAINT "Formulario_inicioId_fkey";

-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "preguntaId",
DROP COLUMN "respuestaId",
ADD COLUMN     "formularioId" INTEGER;

-- AlterTable
ALTER TABLE "Formulario" DROP COLUMN "dependenciaId",
DROP COLUMN "edad",
DROP COLUMN "genero",
DROP COLUMN "inicioId";

-- AlterTable
ALTER TABLE "Inicio" ADD COLUMN     "formularioId" INTEGER;

-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "comentarioId" INTEGER,
ADD COLUMN     "tieneTipoPregunta" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "comentarioId" INTEGER,
ADD COLUMN     "edad" "Edad",
ADD COLUMN     "genero" "Genero";

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
ALTER TABLE "Inicio" ADD CONSTRAINT "Inicio_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciaToFormulario" ADD CONSTRAINT "_DependenciaToFormulario_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciaToFormulario" ADD CONSTRAINT "_DependenciaToFormulario_B_fkey" FOREIGN KEY ("B") REFERENCES "Formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
