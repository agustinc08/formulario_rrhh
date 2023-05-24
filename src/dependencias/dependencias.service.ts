import { Injectable } from '@nestjs/common';
import { Dependencia, Prisma } from '@prisma/client';
import { CreateDependenciaDto } from './dto/create-dependencia.dto';
import { UpdateDependenciaDto } from './dto/update-dependencia.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DependenciasService {
  constructor(private prisma: PrismaService) {}

  async create(createDependenciaDto: CreateDependenciaDto): Promise<Dependencia> {
    const data: Prisma.DependenciaCreateInput = {
      nombreDependencia: createDependenciaDto.nombreDependencia,
    };
    const dependencia = await this.prisma.dependencia.create({ data });
    return dependencia;
  }

  async findAll(): Promise<Dependencia[]> {
    const dependencias = await this.prisma.dependencia.findMany();
    return dependencias;
  }

  async findOne(id: number): Promise<Dependencia> {
    const dependencia = await this.prisma.dependencia.findUnique({ where: { id } });
    return dependencia;
  }

  async update(id: number, updateDependenciaDto: UpdateDependenciaDto): Promise<Dependencia> {
    const data: Prisma.DependenciaUpdateInput = {
      nombreDependencia: updateDependenciaDto.nombreDependencia,
    };
    const dependencia = await this.prisma.dependencia.update({ where: { id }, data });
    return dependencia;
  }

  async remove(id: number): Promise<Dependencia> {
    const dependencia = await this.prisma.dependencia.delete({ where: { id } });
    return dependencia;
  }
}
