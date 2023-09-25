import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePreguntaDto {
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  seccionId: number;

  tieneComentario: boolean;
  tieneTipoPregunta: boolean;

  descripcionComentario: string;

  formularioId: number;
  tipoPreguntaId: number;
  tipoRespuestaId: number;
}
