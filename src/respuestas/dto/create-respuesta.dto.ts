import { Edad, Genero } from "@prisma/client";

export class CreateRespuestaDto {
  respuestas: {
    preguntaId: number;
    dependenciaId: number;
    respuesta: string | null;
    comentario: string | null;
  }[];
  edad: Edad;
  genero: Genero;
}