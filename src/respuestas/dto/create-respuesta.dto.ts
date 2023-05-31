import { Edad, Genero, RespuestaCalificacionEnum, RespuestaExpresionEnum, RespuestaClasificacionEnum, RespuestaGradoEnum } from "@prisma/client";

export class CreateRespuestaDto {
  respuestas: {
    preguntaId: number;
    dependenciaId: number;
    respuestaText: RespuestaExpresionEnum | RespuestaCalificacionEnum | RespuestaClasificacionEnum | RespuestaGradoEnum;
    comentario: string | null;
  }[];
  edad: Edad;
  genero: Genero;
}
