import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  comentario: string;

  @IsNumber()
  @IsNotEmpty()
  preguntaId: number;

  @IsNumber()
  @IsNotEmpty()
  respuestaId: number;
}
