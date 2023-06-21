-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateEnum
CREATE TYPE "Edad" AS ENUM ('DESDE_18_A_45', 'MAS_45');

-- CreateEnum
CREATE TYPE "RespuestaExpresionEnum" AS ENUM ('SI', 'NO', 'NO_SE');

-- CreateEnum
CREATE TYPE "RespuestaGradoEnum" AS ENUM ('ALTA', 'MEDIA', 'BAJA');

-- CreateEnum
CREATE TYPE "RespuestaClasificacionEnum" AS ENUM ('SIEMPRE', 'CASI_SIEMPRE', 'AVECES', 'CASI_NUNCA', 'NUNCA');

-- CreateEnum
CREATE TYPE "RespuestaCalificacionEnum" AS ENUM ('BUENO', 'MUY_BUENO', 'REGULAR', 'MALO', 'MUY_MALO');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('dependencia', 'admin');

-- CreateTable
CREATE TABLE "Formulario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inicio" (
    "id" SERIAL NOT NULL,
    "tituloPrincipal" TEXT NOT NULL,
    "introduccionDescripcion" TEXT,
    "objetivoDescripcion" TEXT,
    "parrafo" TEXT,

    CONSTRAINT "Inicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seccion" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tieneComentario" BOOLEAN NOT NULL DEFAULT false,
    "descripcionComentario" TEXT,
    "tieneExpresion" BOOLEAN NOT NULL DEFAULT false,
    "tieneCalificaciones" BOOLEAN NOT NULL DEFAULT false,
    "tieneClasificaciones" BOOLEAN NOT NULL DEFAULT false,
    "tieneGrado" BOOLEAN NOT NULL DEFAULT false,
    "seccionId" INTEGER,
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dependenciaId" INTEGER NOT NULL,
    "edad" "Edad" NOT NULL,
    "genero" "Genero" NOT NULL,
    "expresion" "RespuestaExpresionEnum",
    "calificaciones" "RespuestaCalificacionEnum",
    "clasificaciones" "RespuestaClasificacionEnum",
    "grado" "RespuestaGradoEnum",
    "preguntaId" INTEGER NOT NULL,
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "comentario" TEXT NOT NULL,
    "preguntaId" INTEGER,
    "respuestaId" INTEGER,
    "dependenciaId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombreDependencia" TEXT NOT NULL,
    "formularioId" INTEGER,
    "rol" "Rol" NOT NULL DEFAULT 'dependencia',

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
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_respuestaId_fkey" FOREIGN KEY ("respuestaId") REFERENCES "Respuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependencia" ADD CONSTRAINT "Dependencia_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clave" ADD CONSTRAINT "Clave_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
