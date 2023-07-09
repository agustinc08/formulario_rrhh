import { Injectable } from '@nestjs/common';
import { Prisma, Respuesta } from '@prisma/client';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}
  
  async create(createRespuestaDto: CreateRespuestaDto) {
    const { pregunta, comentario, formulario, tipoRespuesta, dependencia } = createRespuestaDto;
  
    return this.prisma.respuesta.create({
      data: {
        pregunta: {
          connect: { id: pregunta.id },
        },
        comentario: comentario
          ? { connect: { id: comentario.id } }
          : undefined,
        formulario: {
          connect: { id: formulario.id },
        },
        tipoRespuesta: {
          connect: { id: tipoRespuesta.id },
        },
        dependencia: {
          connect: { id: dependencia.id },
        },
        createdAt: createRespuestaDto.createdAt,
        edad: createRespuestaDto.edad,
        genero: createRespuestaDto.genero,
      },
    });
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
