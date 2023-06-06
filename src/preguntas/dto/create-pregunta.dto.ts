import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePreguntaDto {
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  seccionId: number;

  tieneComentario: boolean

  tieneExpresion: boolean

  tieneCalificaciones: boolean

  tieneClasificaciones: boolean

  tieneGrado: boolean
}