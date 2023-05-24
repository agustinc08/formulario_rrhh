import { Edad, Genero, RespuestaExpresionEnum } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateRespuestaDto {
  @IsOptional()
  @IsNumber()
  dependenciaId?: number;

  @IsOptional()
  @IsNumber()
  preguntaId?: number;

  @IsNumber()
  edad: Edad;

  genero: Genero;
}