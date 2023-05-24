-- CreateEnum
CREATE TYPE "RespuestaEnum" AS ENUM ('SI', 'NO', 'NO_SE');

-- CreateEnum
CREATE TYPE "Edad" AS ENUM ('DESDE_15_A_45', 'MAS_45');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dependenciaId" INTEGER NOT NULL,
    "edad" "Edad" NOT NULL,
    "genero" "Genero" NOT NULL,
    "respuesta" "RespuestaEnum" NOT NULL,
    "preguntaId" INTEGER NOT NULL,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "comentario" TEXT NOT NULL,
    "respuestaId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombreDependencia" TEXT NOT NULL,

    CONSTRAINT "Dependencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clave" (
    "id" SERIAL NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "clave" TEXT NOT NULL,

    CONSTRAINT "Clave_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_respuestaId_fkey" FOREIGN KEY ("respuestaId") REFERENCES "Respuesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clave" ADD CONSTRAINT "Clave_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
