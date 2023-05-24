/*
  Warnings:

  - A unique constraint covering the columns `[dependenciaId]` on the table `Clave` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RespuestaCalificacionesEnum" AS ENUM ('SIEMPRE', 'CASI_SIEMPRE', 'AVECES', 'CASI_NUNCA', 'NUNCA');

-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "tieneCalificaciones" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tieneRespuesta" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "calificaciones" "RespuestaCalificacionesEnum",
ALTER COLUMN "respuesta" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clave_dependenciaId_key" ON "Clave"("dependenciaId");
