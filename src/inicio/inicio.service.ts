import { Injectable } from '@nestjs/common';
import { Inicio } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InicioService {
  constructor(private readonly prisma: PrismaService) {}

  async createInicio(inicioData: any): Promise<Inicio> {
    const { formularioId, ...data } = inicioData;
  
    const existingInicio = await this.prisma.inicio.findFirst({
      where: {
        formulario: {
          some: {
            id: formularioId
          }
        }
      },
    });
  
    if (existingInicio) {
      throw new Error('Ya hay un inicio creado para este formulario');
    }
  
    const createInicioData: Prisma.InicioCreateInput = {
      ...data,
      formulario: {
        connect: {
          id: formularioId
        }
      }
    };
  
    return this.prisma.inicio.create({
      data: createInicioData,
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