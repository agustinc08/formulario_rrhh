-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "seccionId" INTEGER;

-- CreateTable
CREATE TABLE "Seccion" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
