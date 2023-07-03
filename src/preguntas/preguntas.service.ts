import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Pregunta, Prisma } from '@prisma/client';

@Injectable()
export class PreguntasService {
  constructor(private readonly prisma: PrismaService) { }

  async createPregunta(data: Prisma.PreguntaCreateInput): Promise<Pregunta> {
    return this.prisma.pregunta.create({
      data: {
        formulario: { connect: { id: data.formulario?.connect.id } },
        descripcion: data.descripcion,
        seccion: { connect: { id: data.seccion?.connect.id } },
        tieneComentario: data.tieneComentario,
        descripcionComentario: data.descripcionComentario,
        tipoPregunta: { connect: { id: data.tipoPregunta.connect.id } },
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