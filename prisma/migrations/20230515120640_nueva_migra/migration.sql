/*
  Warnings:

  - The `calificaciones` column on the `Respuesta` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RespuestaClasificacionEnum" AS ENUM ('SIEMPRE', 'CASI_SIEMPRE', 'AVECES', 'CASI_NUNCA', 'NUNCA');

-- CreateEnum
CREATE TYPE "RespuestaCalificacionEnum" AS ENUM ('BUENO', 'MUY_BUENO', 'REGULAR', 'MALO', 'MUY_MALO');

-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "clasificaciones" "RespuestaClasificacionEnum",
DROP COLUMN "calificaciones",
ADD COLUMN     "calificaciones" "RespuestaCalificacionEnum";

-- DropEnum
DROP TYPE "RespuestaCalificacionesEnum";
