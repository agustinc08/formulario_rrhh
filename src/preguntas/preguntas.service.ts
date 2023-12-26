import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { TipoRespuesta } from '@prisma/client';

@Injectable()
export class PreguntasService {
  constructor(private readonly prisma: PrismaService) { }

  async createPregunta(data: CreatePreguntaDto) {
    let tipoRespuestaConnect = null; // Objeto para conectar tipoRespuesta
  
    if (data.tipoPreguntaId) {
      // Solo busca tipoRespuestas si se proporciona tipoPreguntaId en data
      const tipoRespuestas = await this.prisma.tipoRespuesta.findMany({
        where: {
          tipoPreguntaId: data.tipoPreguntaId,
        },
      });

  
      // Si hay tipoRespuestas, conecta solo con el primer tipoRespuesta
      if (tipoRespuestas.length > 0) {
        tipoRespuestaConnect = {
          connect: {
            id: tipoRespuestas[0].id,
          },
        };
      }
    }
  
    // Define los datos de la pregunta a crear
    const preguntaData = {
      descripcion: data.descripcion,
      tieneComentario: data.tieneComentario,
      descripcionComentario: data.descripcionComentario,
      seccion: {
        connect: { id: data.seccionId },
      },
      formulario: {
        connect: { id: data.formularioId },
      },
    };
  
    // Solo si tipoPreguntaId está presente, establece tipoPregunta
    if (data.tipoPreguntaId) {
      preguntaData["tipoPregunta"] = {
        connect: { id: data.tipoPreguntaId },
      };
    }
  
    // Solo si tipoRespuestaConnect está definido, establece tipoRespuesta
      // Verifica si hay tipoRespuestas asociadas a la pregunta
      if (tipoRespuestaConnect) {
        preguntaData["tipoRespuesta"] = tipoRespuestaConnect;
      } else {
        // Si no hay tipoRespuesta y tieneTipoPregunta, muestra un mensaje o maneja el error según tus necesidades
        if (data.tieneTipoPregunta) {
          throw new Error("La opción seleccionada tiene Tipo Pregunta pero no tiene un tipo Respuesta asignado.");
        }
      }
      
      return this.prisma.pregunta.create({
        data: preguntaData,
      });
  }
  
  async getPreguntasPorSeccion(seccionId: number) {
    return this.prisma.pregunta.findMany({
      where: { seccionId: seccionId },
      include: {
        comentario: true,
        tipoRespuesta: true, 
      },
    });
  }

  async findAll() {
    return this.prisma.pregunta.findMany({
      include: {
        respuestas: {
          include: {
            comentario: true,
          },
        },
        tipoRespuesta: true,
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
            comentario: true,
          },
        },
        tipoRespuesta: true,
      },
    });
  }

  async update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    const { descripcion } = updatePreguntaDto;
  
    // Verificar si hay respuestas asociadas a la pregunta
    const respuestasCount = await this.prisma.respuesta.count({
      where: {
        preguntaId: id,
      },
    });
  
    if (respuestasCount > 0) {
      throw new Error('No se puede editar la pregunta debido a respuestas asociadas.');
    }
  
    return this.prisma.pregunta.update({
      where: {
        id,
      },
      data: {
        descripcion,
      },
      include: {
        respuestas: true,
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