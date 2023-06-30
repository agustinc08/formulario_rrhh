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
    return this.prisma.tipoPregunta.create({
      data: {
        descripcion: data.descripcion,
        formulario: { connect: { id: data.formularioId } },
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
