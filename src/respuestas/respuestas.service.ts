import { Injectable } from '@nestjs/common';
import { Prisma, Respuesta } from '@prisma/client';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}
  
  async create(respuestas: any[]) {
    try {
      const respuestasEnviadas = [];
  
      for (const respuesta of respuestas) {
        const pregunta = await this.prisma.pregunta.findUnique({
          where: { id: respuesta.preguntaId },
        });
  
        if (!pregunta) {
          throw new Error(`La pregunta con ID ${respuesta.preguntaId} no existe.`);
        }
  
        const tipoRespuesta = await this.prisma.tipoRespuesta.findUnique({
          where: { id: respuesta.tipoRespuesta },
        });
  
        if (!tipoRespuesta) {
          throw new Error(`El tipo de respuesta con ID ${respuesta.tipoRespuesta} no existe.`);
        }
  
        const respuestaCreada = await this.prisma.respuesta.create({
          data: {
            pregunta: { connect: { id: pregunta.id } },
            tipoRespuesta: { connect: { id: tipoRespuesta.id } },
            formulario: { connect: { id: respuesta.formularioId } },
            dependencia: { connect: { id: respuesta.dependenciaId } },
            comentario: {
              create: respuesta.comentarios?.map((comentario: any) => ({
                comentario: comentario.comentario,
                dependencia: { connect: { id: respuesta.dependenciaId } },
              })),
            },
          },
        });
        respuestasEnviadas.push(respuestaCreada);
        console.log(respuestaCreada)
      }
      return respuestasEnviadas;
    } catch (error) {
      throw new Error(`Error al enviar las respuestas: ${error.message}`);
    }
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
