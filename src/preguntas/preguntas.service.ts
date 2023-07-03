import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { TipoRespuesta } from '@prisma/client';

@Injectable()
export class PreguntasService {
  constructor(private readonly prisma: PrismaService) { }

  async createPregunta(data: CreatePreguntaDto) {
    const tipoRespuestas = await this.prisma.tipoRespuesta.findMany({
      where: {
        tipoPreguntaId: data.tipoPreguntaId,
      },
    });
  
    const tipoRespuestaId = tipoRespuestas[0]?.id; // Obtén el primer tipoRespuestaId que coincida
  
    if (!tipoRespuestaId) {
      throw new Error('No se encontró ningún tipoRespuesta para el tipoPregunta especificado');
    }
  
    return this.prisma.pregunta.create({
      data: {
        descripcion: data.descripcion,
        tieneComentario: data.tieneComentario,
        descripcionComentario: data.descripcionComentario,
        tipoPregunta: {
          connect: { id: data.tipoPreguntaId },
        },
        seccion: {
          connect: { id: data.seccionId },
        },
        formulario: {
          connect: { id: data.formularioId },
        },
        tipoRespuesta: {
          connect: { id: tipoRespuestaId },
        },
      },
    });
  }
  
  async getPreguntasPorSeccion(seccionId: number) {
    return this.prisma.pregunta.findMany({
      where: { seccionId: seccionId },
    });
  }

  async findAll() {
    return this.prisma.pregunta.findMany({
      include: {
        respuestas: {
          include: {
            comentarios: true
          }
        }
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.pregunta.findUnique({
      where: {
        id,
      },
      include: {
        respuestas: {
          include: {
            comentarios: true
          }
        }
      },
    });
  }

  async update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    const { descripcion } = updatePreguntaDto;
    return this.prisma.pregunta.update({
      where: {
        id,
      },
      data: {
        descripcion,
      },
      include: {
        respuestas: true
      },
    });
  }

  async remove(id: number) {
    return this.prisma.pregunta.delete({
      where: {
        id,
      },
    });
  }
}