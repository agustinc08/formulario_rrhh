-- CreateEnum
CREATE TYPE "RespuestaGradoEnum" AS ENUM ('ALTA', 'MEDIA', 'BAJA');

-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "grado" "RespuestaGradoEnum";
