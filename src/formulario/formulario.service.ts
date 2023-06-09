import { Injectable } from '@nestjs/common';
import { Formulario, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FormularioService {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(data: Prisma.FormularioCreateInput): Promise<Formulario> {
    return this.prisma.formulario.create({ data });
  }
  
  async getFormulariosPorDependencia(dependenciaId: number) {
    try {
      const id = parseInt(dependenciaId.toString());
  
      const formularios = await this.prisma.dependencia
        .findUnique({ where: { id } })
        .formularios();
  
      return formularios;
    } catch (error) {
      throw new Error(`Error al obtener los formularios de la dependencia: ${error.message}`);
    }
  }
  
  
  async findAll(): Promise<Formulario[]> {
    const formularios = await this.prisma.formulario.findMany({
      include: {
        preguntas: {
          include: {
            tipoRespuesta: true,
          },
        },
      },
    });

    return formularios;
  }

  async findOne(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.FormularioUpdateInput): Promise<Formulario | null> {
    return this.prisma.formulario.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.delete({ where: { id } });
  }
}
