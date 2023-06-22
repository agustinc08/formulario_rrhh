import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Seccion } from '.prisma/client';

@Injectable()
export class SeccionesService {
  constructor(private prisma: PrismaService) {}

  async crearSeccion(formularioId: number, descripcion: string): Promise<Seccion> {
    const seccionExistente = await this.prisma.seccion.findFirst({
      where: {
        descripcion: {
          equals: descripcion,
        },
      },
    });
  
    if (seccionExistente) {
      throw new Error('Ya existe una sección con el mismo nombre');
    }
  
    return this.prisma.seccion.create({
      data: {
        descripcion,
        formulario: {
          connect: {
            id: formularioId
          }
        }
      },
    });
  }
  

  async buscarSeccionPorId(id: number): Promise<Seccion | null> {
    return this.prisma.seccion.findUnique({
      where: { id },
    });
  }

  async buscarTodasLasSecciones(): Promise<Seccion[]> {
    return this.prisma.seccion.findMany();
  }

  async actualizarSeccion(id: number, descripcion: string): Promise<Seccion> {
    return this.prisma.seccion.update({
      where: { id },
      data: { descripcion },
    });
  }

  async eliminarSeccion(id: number): Promise<Seccion> {
    return this.prisma.seccion.delete({
      where: { id },
    });
  }
}
