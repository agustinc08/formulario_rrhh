// create-respuesta.dto.ts

import { Edad, Genero } from '@prisma/client';

export class CreateRespuestaDto {
  createdAt?: Date | string;
  edad?: Edad | null;
  genero?: Genero | null;
  pregunta: {
    id: any; connect: { id: number } 
}; // Ajusta esto según la estructura generada por Prisma
  comentario?: {
    id: any; connect: { id: number } 
}; // Ajusta esto según la estructura generada por Prisma
  formulario: {
    id: any; connect: { id: number } 
}; // Ajusta esto según la estructura generada por Prisma
  tipoRespuesta: {
    id: any; connect: { id: number } 
}; // Ajusta esto según la estructura generada por Prisma
  dependencia: {
    id: any; connect: { id: number } 
}; // Ajusta esto según la estructura generada por Prisma
}