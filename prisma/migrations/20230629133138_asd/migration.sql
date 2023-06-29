-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateEnum
CREATE TYPE "Edad" AS ENUM ('DESDE_18_A_45', 'MAS_45');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('dependencia', 'admin');

-- CreateTable
CREATE TABLE "Formulario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "inicioId" INTEGER,
    "tipoPreguntaId" INTEGER,
    "estaActivo" BOOLEAN,
    "dependenciaId" INTEGER NOT NULL,
    "edad" "Edad" NOT NULL,
    "genero" "Genero" NOT NULL,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombreDependencia" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tieneComentario" BOOLEAN NOT NULL DEFAULT false,
    "descripcionComentario" TEXT,
    "tipoPreguntaId" INTEGER,
    "seccionId" INTEGER,
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
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
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preguntaId" INTEGER NOT NULL,
    "formularioId" INTEGER NOT NULL,
    "tipoRespuestaId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,

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
CREATE TABLE "TipoPregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "TipoPregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoRespuesta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipoPreguntaId" INTEGER NOT NULL,

    CONSTRAINT "TipoRespuesta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_inicioId_fkey" FOREIGN KEY ("inicioId") REFERENCES "Inicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_tipoPreguntaId_fkey" FOREIGN KEY ("tipoPreguntaId") REFERENCES "TipoPregunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clave" ADD CONSTRAINT "Clave_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_tipoPreguntaId_fkey" FOREIGN KEY ("tipoPreguntaId") REFERENCES "TipoPregunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_tipoRespuestaId_fkey" FOREIGN KEY ("tipoRespuestaId") REFERENCES "TipoRespuesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_respuestaId_fkey" FOREIGN KEY ("respuestaId") REFERENCES "Respuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoRespuesta" ADD CONSTRAINT "TipoRespuesta_tipoPreguntaId_fkey" FOREIGN KEY ("tipoPreguntaId") REFERENCES "TipoPregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
