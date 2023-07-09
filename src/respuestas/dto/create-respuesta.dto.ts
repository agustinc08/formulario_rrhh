import { CreateComentariosDto } from './create-comentarios.dto';
import { Edad, Genero } from '@prisma/client';

export class CreateRespuestaDto {
  createdAt?: Date | string;
  preguntasRespuestas: Array<{
    preguntaId: number;
    formularioId: number;
    tipoRespuestaId: number;
    dependenciaId: number;
    edad?: Edad;
    genero?: Genero;
    comentario: CreateComentariosDto; // Hacer que comentario sea obligatorio
  }>;
}