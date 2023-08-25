import { Injectable } from '@nestjs/common';
import { Dependencia, Prisma } from '@prisma/client';
import { CreateDependenciaDto } from './dto/create-dependencia.dto';
import { UpdateDependenciaDto } from './dto/update-dependencia.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DependenciasService {
  constructor(private prisma: PrismaService) {}
  
  async create(createDependenciaDto: CreateDependenciaDto): Promise<Dependencia> {
    const { nombreDependencia, rol, polo, edificio } = createDependenciaDto;
  
    // Verificar si ya existe una dependencia con el mismo nombre
    const existingDependencia = await this.prisma.dependencia.findFirst({
      where: { nombreDependencia: { equals: nombreDependencia } },
    });
  
    if (existingDependencia) {
      throw new Error('Ya existe una dependencia con el mismo nombre');
    }
  
    // Obtener el último valor de id
    const lastDependencia = await this.prisma.dependencia.findFirst({
      orderBy: { id: 'desc' },
    });
  
    // Calcular el nuevo valor de id
    const newId = lastDependencia ? lastDependencia.id + 1 : 1;
  
    // Crear la nueva dependencia sin la propiedad id
    const data: Prisma.DependenciaCreateInput = {
      nombreDependencia,
      rol,
      polo,
      edificio
    };
  
    // Utilizar createMany() para insertar la nueva dependencia con el nuevo valor de id
    const dependencia = await this.prisma.dependencia.createMany({
      data: [{ id: newId, ...data }],
    });
  
    return dependencia[0];
  }
  

  async findAll(): Promise<Dependencia[]> {
    const dependencias = await this.prisma.dependencia.findMany();
    return dependencias;
  }

  async findOne(id: number): Promise<Dependencia> {
    const dependencia = await this.prisma.dependencia.findUnique({ where: { id } });
    return dependencia;
  }

  async buscarDependenciaPorNombre(nombre: string) {
    const dependencia = await this.prisma.dependencia.findFirst({
      where: { nombreDependencia: { equals: nombre } },
    });
    return dependencia ? dependencia.id : null;
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
