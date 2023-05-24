/*
  Warnings:

  - The `respuesta` column on the `Respuesta` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RespuestaExpresionEnum" AS ENUM ('SI', 'NO', 'NO_SE');

-- AlterTable
ALTER TABLE "Respuesta" DROP COLUMN "respuesta",
ADD COLUMN     "respuesta" "RespuestaExpresionEnum";

-- DropEnum
DROP TYPE "RespuestaEnum";
