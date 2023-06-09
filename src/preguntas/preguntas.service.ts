import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Injectable()
export class PreguntasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPreguntaDto: CreatePreguntaDto) {
    const {
      descripcion,
      seccionId,
      tieneComentario,
      descripcionComentario,
      tieneExpresion,
      tieneCalificaciones,
      tieneClasificaciones,
      tieneGrado
    } = createPreguntaDto;
    return this.prisma.pregunta.create({
      data: {
        descripcion,
        seccionId, // Agregar el campo seccionId en los datos
        tieneComentario,
        descripcionComentario,
        tieneExpresion,
        tieneCalificaciones,
        tieneClasificaciones,
        tieneGrado
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