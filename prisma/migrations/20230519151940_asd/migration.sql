/*
  Warnings:

  - You are about to drop the column `respuesta` on the `Respuesta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Respuesta" DROP COLUMN "respuesta",
ADD COLUMN     "expresion" "RespuestaExpresionEnum";
