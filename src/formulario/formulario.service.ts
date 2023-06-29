import { Injectable } from '@nestjs/common';
import { Formulario, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FormularioService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: Prisma.FormularioCreateInput): Promise<Formulario> {
    const formularioData: Prisma.FormularioCreateInput = {
      nombre: data.nombre,
      preguntas: data.preguntas,
      dependencias: data.dependencias, // Utiliza la propiedad correcta dependencias
      respuestas: data.respuestas,
      estaActivo: data.estaActivo,
      edad: data.edad,
      genero: data.genero,
    };
  
    return this.prisma.formulario.create({ data: formularioData });
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
    return this.prisma.formulario.findMany();
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
