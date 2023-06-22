import { Injectable } from '@nestjs/common';
import { Inicio } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InicioService {
  constructor(private readonly prisma: PrismaService) {}

  async createInicio(inicioData: any): Promise<Inicio> {
    // Verifica si ya existe un inicio creado
    const existingInicio = await this.prisma.inicio.findFirst();
  
    if (existingInicio) {
      throw new Error('Ya hay un inicio creado');
    }
  
    // Obtén el formularioId del inicioData
    const { formularioId, ...data } = inicioData;
  
    // Crea el inicio con el formularioId proporcionado
    return this.prisma.inicio.create({
      data: {
        formulario: {
          connect: {
            id: formularioId
          }
        },
        ...data
      }
    });
  }  

  async getInicioPorId(id: number): Promise<Inicio | null> {
    return this.prisma.inicio.findUnique({ where: { id } });
  }

  async getInicio() {
    try {
      const inicio = await this.prisma.inicio.findFirst({
       
      });
      return inicio;
    } catch (error) {
      throw new Error('Error retrieving Inicio data');
    }
  }
}