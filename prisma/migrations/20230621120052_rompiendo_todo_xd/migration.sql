/*
  Warnings:

  - The values [dependencia,admin] on the enum `Rol` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `formularioId` to the `Pregunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formularioId` to the `Respuesta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Rol_new" AS ENUM ('DEPENDENCIA', 'ADMIN');
ALTER TABLE "Dependencia" ALTER COLUMN "rol" DROP DEFAULT;
ALTER TABLE "Dependencia" ALTER COLUMN "rol" TYPE "Rol_new" USING ("rol"::text::"Rol_new");
ALTER TYPE "Rol" RENAME TO "Rol_old";
ALTER TYPE "Rol_new" RENAME TO "Rol";
DROP TYPE "Rol_old";
ALTER TABLE "Dependencia" ALTER COLUMN "rol" SET DEFAULT 'DEPENDENCIA';
COMMIT;

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_respuestaId_fkey";

-- DropIndex
DROP INDEX "Clave_dependenciaId_key";

-- AlterTable
ALTER TABLE "Comentario" ALTER COLUMN "respuestaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Dependencia" ADD COLUMN     "formularioId" INTEGER,
ALTER COLUMN "rol" SET DEFAULT 'DEPENDENCIA';

-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "formularioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "formularioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Formulario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_respuestaId_fkey" FOREIGN KEY ("respuestaId") REFERENCES "Respuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependencia" ADD CONSTRAINT "Dependencia_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
