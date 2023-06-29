import { Injectable } from '@nestjs/common';
import { Prisma, Respuesta } from '@prisma/client';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}

  async createRespuesta(data: Prisma.RespuestaCreateInput): Promise<Respuesta> {
    return this.prisma.respuesta.create({
      data,
    });
  }
  
  async buscarRespuestas(preguntaId: number, dependenciaId: number): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId,
        dependenciaId,
      },
      include: {
        comentarios: true, // Carga los comentarios asociados a cada respuesta
      },
    });
  }

  async getRespuestasByPreguntaId(preguntaId: number): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        preguntaId: preguntaId,
      },
      include: {
        comentarios: true,
      },
    });
  }
  
  async getRespuestasByDependenciaId(dependenciaId: number): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany({
      where: {
        dependenciaId: dependenciaId,
      },
      include: {
        comentarios: true,
      },
    });
  }

  async findAll(): Promise<Respuesta[]> {
    const respuestas = await this.prisma.respuesta.findMany({
      include: {
        comentarios: true,
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
