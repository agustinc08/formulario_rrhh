import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Formulario, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FormularioService {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(data: Prisma.FormularioCreateInput): Promise<Formulario> {
    // Verificar si ya existe un formulario con el mismo nombre
    const formularioExistente = await this.prisma.formulario.findFirst({
      where: {
        nombre: {
          equals: data.nombre
        }
      },
    });

    if (formularioExistente) {
      throw new Error(
        'Ya existe un formulario con el mismo nombre',
      );
    }

    // Si no existe, crea el nuevo formulario
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
  
  async getSeccionesPorFormulario(formularioId: number) {
    try {
      const id = parseInt(formularioId.toString());

      const secciones = await this.prisma.seccion.findMany({
        where: {
          formularioId: id,
        },
      });

      return secciones;
    } catch (error) {
      throw new Error(`Error al obtener las secciones del formulario: ${error.message}`);
    }
  }

  async getSeccionesActivasPorFormulario(formularioId: number) {
    try {
      const formularioActivo = await this.findActiveFormulario(formularioId);
      if (!formularioActivo) {
        throw new Error("No se encontró un formulario activo con el formularioId proporcionado.");
      }
  
      const secciones = await this.getSeccionesPorFormulario(formularioId);
      return secciones;
    } catch (error) {
      throw new Error(`Error al obtener las secciones activas del formulario: ${error.message}`);
    }
  }

  async findActiveFormulario(formularioId: number): Promise<Formulario | null> {
    return this.prisma.formulario.findFirst({
      where: {
        id: formularioId,
        estaActivo: true,
      },
    });
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

  async updateFormularioEstado(id: number, estaActivo: boolean): Promise<Formulario | null> {
    const formulario = await this.prisma.formulario.findUnique({ where: { id } });
    if (!formulario) {
      throw new NotFoundException('El formulario no existe');
    }
  
    const formulariosActivos = await this.prisma.formulario.findMany({ where: { estaActivo: true } });
  
    if (estaActivo) {
      // Desactivar los formularios activos excepto el que se va a activar
      await this.prisma.formulario.updateMany({
        where: {
          id: { not: id },
        },
        data: { estaActivo: false },
      });
    }
  
    const updatedFormulario = await this.prisma.formulario.update({
      where: { id },
      data: { estaActivo },
    });
  
    return updatedFormulario;
  }
  
  async countFormulariosActivos(): Promise<number> {
    return this.prisma.formulario.count({ where: { estaActivo: true } });
  }
  
  async delete(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.delete({ where: { id } });
  }

  async getTiposRespuestaPorFormulario(formularioId: number) {
    try {
      const id = parseInt(formularioId.toString());
  
    const tiposRespuesta = await this.prisma.formulario
      .findUnique({ where: { id } })
      .tiposRespuesta();
  
    return tiposRespuesta;
  } catch (error) {
    throw new Error(`Error al obtener los tipos de respuesta del formulario: ${error.message}`);
  }
  }
}
