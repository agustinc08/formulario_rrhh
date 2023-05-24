import { IsNotEmpty } from 'class-validator';

export class UpdatePreguntaDto {
  @IsNotEmpty()
  descripcion: string;
}