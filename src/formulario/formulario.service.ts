import { Injectable } from '@nestjs/common';
import { Formulario, Pregunta, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FormularioService {
  constructor(private readonly prisma: PrismaService) { }

  async createPregunta(data: Prisma.PreguntaCreateInput): Promise<Pregunta> {
    const preguntaData: Prisma.PreguntaCreateInput = {
      descripcion: data.descripcion,
      tieneComentario: data.tieneComentario,
      descripcionComentario: data.descripcionComentario,
      formulario: null, // Asignar null si no tienes acceso a la información del formulario
    };
  
    if (data.formulario && data.formulario.connect && data.formulario.connect.id) {
      preguntaData.formulario = { connect: { id: data.formulario.connect.id } };
    }
  
    if (data.seccion && data.seccion.connect && data.seccion.connect.id) {
      preguntaData.seccion = { connect: { id: data.seccion.connect.id } };
    }
  
    if (data.tipoPregunta && data.tipoPregunta.connect && data.tipoPregunta.connect.id) {
      preguntaData.tipoPregunta = { connect: { id: data.tipoPregunta.connect.id } };
    }
  
    return this.prisma.pregunta.create({
      data: preguntaData,
    });
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
