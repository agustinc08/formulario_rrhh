import { Injectable } from '@nestjs/common';
import { Formulario, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FormularioService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Formulario[]> {
    return this.prisma.formulario.findMany();
  }

  async findOne(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.findUnique({ where: { id } });
  }

  async create(data: Prisma.FormularioCreateInput): Promise<Formulario> {
    return this.prisma.formulario.create({ data });
  }

  async update(id: number, data: Prisma.FormularioUpdateInput): Promise<Formulario | null> {
    return this.prisma.formulario.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.delete({ where: { id } });
  }
}
