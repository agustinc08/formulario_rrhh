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

    console.log(existingInicio)
  
    // Crea el inicio
    return this.prisma.inicio.create({ data: inicioData });
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