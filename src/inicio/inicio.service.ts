import { Injectable } from '@nestjs/common';
import { Inicio } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InicioService {
  constructor(private readonly prisma: PrismaService) {}

  async getInicioPorId(id: number): Promise<Inicio | null> {
    return this.prisma.inicio.findUnique({ where: { id } });
  }

  async createInicio(inicioData: any): Promise<Inicio> {
    return this.prisma.inicio.create({ data: inicioData });
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