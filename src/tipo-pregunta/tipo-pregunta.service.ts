import { Injectable } from '@nestjs/common';
import { TipoPregunta } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class TipoPreguntaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TipoPregunta[]> {
    return this.prisma.tipoPregunta.findMany();
  }

  async findById(id: number): Promise<TipoPregunta | null> {
    return this.prisma.tipoPregunta.findUnique({ where: { id } });
  }
  
  async create(data: TipoPregunta): Promise<TipoPregunta> {
    // Validar si la descripción está vacía
    if (!data.descripcion) {
      throw new Error('La descripción no puede estar vacía');
    }
  
    const tipoPreguntaExistente = await this.prisma.tipoPregunta.findFirst({
      where: {
        descripcion: {
          equals: data.descripcion,
        },
      },
    });
  
    if (tipoPreguntaExistente) {
      throw new Error('Ya existe un TipoPregunta con la misma descripción');
    }
  
    return this.prisma.tipoPregunta.create({
      data: {
        descripcion: data.descripcion,
        formulario: { connect: { id: 1 } },
      },
    });
  }

  async update(id: number, data: TipoPregunta): Promise<TipoPregunta | null> {
    return this.prisma.tipoPregunta.update({ where: { id }, data });
  }

  async delete(id: number): Promise<TipoPregunta | null> {
    return this.prisma.tipoPregunta.delete({ where: { id } });
  }
}
