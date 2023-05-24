import { IsString, IsNotEmpty } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsNotEmpty()
  preguntaId: number;

  @IsNotEmpty()
  respuestaId: number;
}