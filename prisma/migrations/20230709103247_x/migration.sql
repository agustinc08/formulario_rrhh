/*
  Warnings:

  - You are about to drop the column `comentario` on the `Comentario` table. All the data in the column will be lost.
  - Added the required column `respuestaComentario` to the `Comentario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "comentario",
ADD COLUMN     "respuestaComentario" TEXT NOT NULL;
