import { Injectable } from '@nestjs/common';
import { Prisma, Respuesta } from '@prisma/client';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) { }

  async createRespuestas(createRespuestaDto: CreateRespuestaDto) {
    if (!createRespuestaDto || !createRespuestaDto.preguntasRespuestas) {
      throw new Error('Invalid createRespuestaDto');
    }
    const respuestasPromises = createRespuestaDto.preguntasRespuestas.map(async (preguntaRespuesta) => {
      const { preguntaId, comentario, formularioId, tipoRespuestaId, dependenciaId, edad, genero } = preguntaRespuesta;

      const respuesta = await this.prisma.respuesta.create({
        data: {
          pregunta: { connect: { id: preguntaId } },
          comentario: {
            create: {
              respuestaComentario: comentario.respuestaComentario,
              dependencia: { connect: { id: comentario.dependenciaId } },
              formulario: { connect: { id: formularioId } },
            },
          },
          formulario: { connect: { id: formularioId } },
          tipoRespuesta: { connect: { id: tipoRespuestaId } },
          dependencia: { connect: { id: dependenciaId } },
          edad,
          genero,
        },
        include: {
          comentario: true,
          tipoRespuesta:true,
        },
        
      });

      return respuesta;
    });

    const respuestas = await Promise.all(respuestasPromises);

    return respuestas;
  }

  async buscarRespuestas(preguntaId: number, dependenciaId: number): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId,
        dependenciaId,
      },
      include: {
        comentario: true, // Carga los comentarios asociados a cada respuesta
      },
    });
  }

  async getRespuestasByPreguntaId(preguntaId: number): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId: preguntaId,
      },
      include: {
        comentario: true,
      },
    });
  }

  async getRespuestasByDependenciaId(dependenciaId: number): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        dependenciaId: dependenciaId,
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
