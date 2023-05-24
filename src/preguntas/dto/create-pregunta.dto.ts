import { IsNotEmpty } from 'class-validator';

export class CreatePreguntaDto {
  @IsNotEmpty()
  descripcion: string;
}