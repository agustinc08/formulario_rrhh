import { Injectable } from '@nestjs/common';
import { Formulario, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FormularioService {
  constructor(private readonly prisma: PrismaService) { }


  async getFormulariosPorDependencia(dependenciaId: number) {
    try {
      const id = parseInt(dependenciaId.toString()); // Convertir a entero
  
      const formularios = await this.prisma.dependencia
        .findUnique({ where: { id } })
        .formulario();
  
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

  async create(data: Prisma.FormularioCreateInput): Promise<Formulario> {
    // Obtener el último formulario creado
    const lastFormulario = await this.prisma.formulario.findFirst({
      orderBy: { id: 'desc' },
    });
  
    let nextId = 1;
  
    if (lastFormulario) {
      // Si hay un formulario existente, generar el siguiente ID
      nextId = lastFormulario.id + 1;
    }
  
    // Asignar el nuevo ID al formulario (omitir la propiedad 'id')
    const formularioData: Prisma.FormularioCreateInput = {
      nombre: data.nombre,
      preguntas: data.preguntas,
      dependencias: data.dependencias,
      respuestas: data.respuestas,
      // Otras propiedades del formulario si las hubiera
    };
  
    // Crear el formulario con el nuevo ID generado por Prisma
    return this.prisma.formulario.create({ data: formularioData });
  }

  async update(id: number, data: Prisma.FormularioUpdateInput): Promise<Formulario | null> {
    return this.prisma.formulario.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.delete({ where: { id } });
  }
}
