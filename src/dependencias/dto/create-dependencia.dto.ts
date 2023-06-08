import { Rol } from "@prisma/client";

export class CreateDependenciaDto {
    nombreDependencia: string;
    rol: Rol
  }