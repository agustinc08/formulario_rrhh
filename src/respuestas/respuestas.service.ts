import { Injectable } from '@nestjs/common';
import { Prisma, Respuesta } from '@prisma/client';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}

  async createRespuestas(createRespuestaDto: CreateRespuestaDto) {
    if (!createRespuestaDto || !createRespuestaDto.preguntasRespuestas) {
      throw new Error('Invalid createRespuestaDto');
    }

    const respuestasPromises = createRespuestaDto.preguntasRespuestas.map(
      async (preguntaRespuesta) => {
        const {
          preguntaId,
          comentario,
          formularioId,
          tipoRespuestaId,
          dependenciaId,
          edad,
          genero,
        } = preguntaRespuesta;

        // Verificar si la dependencia existe antes de crear la respuesta
        const dependencia = await this.prisma.dependencia.findUnique({
          where: { id: dependenciaId },
        });

        if (!dependencia) {
          // Manejar el caso en el que la dependencia no existe (opcional)
          throw new Error(
            `La dependencia con ID ${dependenciaId} no fue encontrada`,
          );
        }

        const respuestaData: any = {
          // Usamos 'any' para flexibilizar el tipo
          pregunta: { connect: { id: preguntaId } },
          formulario: { connect: { id: formularioId } },
          tipoRespuesta: { connect: { id: tipoRespuestaId } },
          dependencia: { connect: { id: dependenciaId } },
          edad,
          genero,
        };

        // Verificar si hay un comentario y crearlo si existe
        if (comentario && comentario.respuestaComentario) {
          respuestaData.comentario = {
            create: {
              respuestaComentario: comentario.respuestaComentario,
              dependencia: { connect: { id: dependenciaId } },
              formulario: { connect: { id: formularioId } },
            },
          };
        }

        const respuesta = await this.prisma.respuesta.create({
          data: respuestaData,
          include: {
            comentario: true,
            tipoRespuesta: true,
          },
        });

        return respuesta;
      },
    );

    const respuestas = await Promise.all(respuestasPromises);

    return respuestas;
  }

  async buscarRespuestas(
    preguntaId: number[],
    dependenciaId: number[],
    formularioId: number,
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId: {
          in: preguntaId,
        },
        dependenciaId: {
          in: dependenciaId,
        },
        formularioId: {
          in: formularioId,
        },
      },
      include: {
        comentario: true,
      },
    });
  }

  async buscarRespuestasPorPreguntaYDependencia(
    preguntaId: number[],
    dependenciaId: number[],
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId: {
          in: preguntaId,
        },
        dependenciaId: {
          in: dependenciaId,
        },
      },
      include: {
        comentario: true,
      },
    });
  }

  async buscarRespuestasPorPreguntaYFormulario(
    preguntaId: number[],
    formularioId: number,
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId: {
          in: preguntaId,
        },
        formularioId: {
          in: formularioId,
        },
      },
      include: {
        comentario: true,
      },
    });
  }
  async buscarRespuestasPorDependenciaYFormulario(
    dependenciaId: number[],
    formularioId: number,
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        dependenciaId: {
          in: dependenciaId,
        },
        formularioId: {
          in: formularioId,
        },
      },
      include: {
        comentario: true,
      },
    });
  }

  async findRespuestaById(id: number): Promise<Respuesta> {
    return this.prisma.respuesta.findUnique({
      where: { id },
      include: {
        comentario: true,
        tipoRespuesta: true,
      },
    });
  }

  async getRespuestasByPreguntaIds(
    preguntaIds: number[],
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId: {
          in: preguntaIds,
        },
      },
      include: {
        comentario: true,
      },
    });
  }

  async getRespuestasByDependenciaIds(
    dependenciaIds: number[],
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        dependenciaId: {
          in: dependenciaIds,
        },
      },
      include: {
        comentario: true,
      },
    });
  }

  async getRespuestasByFormularioId(
    formularioId: number,
  ): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        formularioId: formularioId,
      },
      include: {
        comentario: true,
      },
    });
  }

  async findAll(): Promise<Respuesta[]> {
    const respuestas = await this.prisma.respuesta.findMany({
      include: {
        comentario: true,
      },
    });
    return respuestas;
  }

  async remove(id: number): Promise<Respuesta> {
    const deletedRespuesta = await this.prisma.respuesta.delete({
      where: { id },
    });
    return deletedRespuesta;
  }
}
