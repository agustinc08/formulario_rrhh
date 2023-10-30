-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateEnum
CREATE TYPE "Polo" AS ENUM ('LAVALLE', 'INMIGRANTES');

-- CreateEnum
CREATE TYPE "Edificio" AS ENUM ('Lavalle_1220', 'Lalalle_1212', 'Talcahuano_790', 'Talcahuano_490', 'Uruguay_714', 'CarlosPelegrini_algo', 'Inmigrantes_algo');

-- CreateEnum
CREATE TYPE "Edad" AS ENUM ('DESDE_18_A_45', 'MAS_45');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('dependencia', 'usuario', 'admin');

-- CreateTable
CREATE TABLE "Formulario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estaActivo" BOOLEAN,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombreDependencia" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'dependencia',
    "polo" "Polo" NOT NULL,
    "edificio" "Edificio" NOT NULL,

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
CREATE TABLE "Inicio" (
    "id" SERIAL NOT NULL,
    "tituloPrincipal" TEXT NOT NULL,
    "introduccionDescripcion" TEXT,
    "objetivoDescripcion" TEXT,
    "parrafo" TEXT,
    "formularioId" INTEGER,

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
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "descripcionComentario" TEXT,
    "tieneComentario" BOOLEAN NOT NULL DEFAULT false,
    "tieneTipoPregunta" BOOLEAN NOT NULL DEFAULT false,
    "tipoPreguntaId" INTEGER,
    "tipoRespuestaId" INTEGER,
    "seccionId" INTEGER,
    "comentarioId" INTEGER,
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preguntaId" INTEGER NOT NULL,
    "comentarioId" INTEGER,
    "formularioId" INTEGER NOT NULL,
    "tipoRespuestaId" INTEGER,
    "dependenciaId" INTEGER NOT NULL,
    "edad" "Edad",
    "genero" "Genero",

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "respuestaComentario" TEXT,
    "dependenciaId" INTEGER NOT NULL,
    "formularioId" INTEGER,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoPregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "TipoPregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoRespuesta" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipoPreguntaId" INTEGER NOT NULL,
    "formularioId" INTEGER NOT NULL,

    CONSTRAINT "TipoRespuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DependenciaToFormulario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DependenciaToFormulario_AB_unique" ON "_DependenciaToFormulario"("A", "B");

-- CreateIndex
CREATE INDEX "_DependenciaToFormulario_B_index" ON "_DependenciaToFormulario"("B");

-- AddForeignKey
ALTER TABLE "Clave" ADD CONSTRAINT "Clave_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inicio" ADD CONSTRAINT "Inicio_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_tipoPreguntaId_fkey" FOREIGN KEY ("tipoPreguntaId") REFERENCES "TipoPregunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_tipoRespuestaId_fkey" FOREIGN KEY ("tipoRespuestaId") REFERENCES "TipoRespuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Seccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_tipoRespuestaId_fkey" FOREIGN KEY ("tipoRespuestaId") REFERENCES "TipoRespuesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoPregunta" ADD CONSTRAINT "TipoPregunta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoRespuesta" ADD CONSTRAINT "TipoRespuesta_tipoPreguntaId_fkey" FOREIGN KEY ("tipoPreguntaId") REFERENCES "TipoPregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoRespuesta" ADD CONSTRAINT "TipoRespuesta_formularioId_fkey" FOREIGN KEY ("formularioId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciaToFormulario" ADD CONSTRAINT "_DependenciaToFormulario_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciaToFormulario" ADD CONSTRAINT "_DependenciaToFormulario_B_fkey" FOREIGN KEY ("B") REFERENCES "Formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
