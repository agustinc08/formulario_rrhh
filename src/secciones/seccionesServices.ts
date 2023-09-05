import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Seccion } from '.prisma/client';
import { Formulario } from '@prisma/client';

@Injectable()
export class SeccionesService {
  constructor(private prisma: PrismaService) {}

  async crearSeccion(
    formularioId: number,
    descripcion: string,
  ): Promise<Seccion> {
    const seccionExistente = await this.prisma.seccion.findFirst({
      where: {
        descripcion: {
          equals: descripcion,
        },
        formularioId: formularioId,
      },
    });

    if (seccionExistente) {
      throw new Error(
        'Ya existe una sección con el mismo nombre en este formulario',
      );
    }

    return this.prisma.seccion.create({
      data: {
        descripcion,
        formulario: {
          connect: {
            id: formularioId,
          },
        },
      },
    });
  }

  async buscarSeccionesConFormularioActivo(): Promise<Seccion[]> {
    // Get all active formularios
    const formulariosActivos = await this.prisma.formulario.findMany({
      where: {
        estaActivo: true,
      },
    });

    // Extract the IDs of the active formularios
    const formularioIds = formulariosActivos.map(
      (formulario: Formulario) => formulario.id,
    );

    // Get all secciones that are associated with the active formularios
    return this.prisma.seccion.findMany({
      where: {
        formulario: {
          id: {
            in: formularioIds,
          },
        },
      },
    });
  }

  async buscarSeccionPorId(id: number): Promise<Seccion | null> {
    // Ensure that the id is a valid integer
    if (isNaN(id)) {
      throw new Error('Invalid id provided. Expected a valid integer.');
    }

    return this.prisma.seccion.findUnique({
      where: { id },
    });
  }

  async buscarTodasLasSecciones(): Promise<Seccion[]> {
    return this.prisma.seccion.findMany();
  }

  async actualizarSeccion(id: number, descripcion: string): Promise<Seccion> {
    const seccion = await this.prisma.seccion.findUnique({ where: { id } });
  
    if (!seccion) {
      throw new Error(`No se encontró la sección con el ID ${id}`);
    }
  
    const preguntasConRespuestas = await this.prisma.respuesta.findMany({
      where: { pregunta: { seccionId: id } }
    });
  
    if (preguntasConRespuestas.length > 0) {
      throw new Error('No se puede modificar la sección ya que tiene preguntas con respuestas.');
    }
  
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
