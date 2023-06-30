import { Injectable } from '@nestjs/common';
import { TipoRespuesta } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoRespuestaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TipoRespuesta[]> {
    return this.prisma.tipoRespuesta.findMany();
  }

  async findById(id: number): Promise<TipoRespuesta | null> {
    return this.prisma.tipoRespuesta.findUnique({ where: { id } });
  }

  async create(data: TipoRespuesta): Promise<TipoRespuesta> {
    return this.prisma.tipoRespuesta.create({ data });
  }

  async update(id: number, data: TipoRespuesta): Promise<TipoRespuesta | null> {
    return this.prisma.tipoRespuesta.update({ where: { id }, data });
  }

  async delete(id: number): Promise<TipoRespuesta | null> {
    return this.prisma.tipoRespuesta.delete({ where: { id } });
  }
}