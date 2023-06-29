import { Edad, Genero} from "@prisma/client";

export class CreateRespuestaDto {
  respuestas: {
    preguntaId: number;
    dependenciaId: number;
    comentario: string | null;
  }[];
  edad: Edad;
  genero: Genero;
  formularioId: number;
}
