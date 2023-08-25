import { Edificio, Polo, Rol,  } from "@prisma/client";

export class CreateDependenciaDto {
    nombreDependencia: string;
    rol: Rol;
    polo: Polo;
    edificio: Edificio;
  }