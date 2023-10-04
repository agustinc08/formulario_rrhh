import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClaveDto } from './dto/create-clave.dto';
import { UpdateClaveDto } from './dto/update-clave.dto';

@Injectable()
export class ClavesService {
  constructor(private prisma: PrismaService) {}

  async create(createClaveDto: CreateClaveDto) {
    const { dependenciaId, clave } = createClaveDto;
  
    // Verificar si la dependencia ya tiene una clave asignada
    const dependencia = await this.prisma.dependencia.findUnique({
      where: {
        id: dependenciaId,
      },
      include: {
        claves: true,
      },
    });
  
    if (dependencia && dependencia.claves && dependencia.claves.some(claveObj => claveObj.clave === clave)) {
      throw new Error('La dependencia ya tiene una clave asignada');
    }
  
    const claveCreated = await this.prisma.clave.create({
      data: {
        dependencia: {
          connect: {
            id: dependenciaId,
          },
        },
        clave,
      },
    });
  
    return claveCreated;
  }
  
  async findAll() {
    const claves = await this.prisma.clave.findMany({
      include: {
        dependencia: true,
      },
    });

    return claves;
  }

  async findOne(id: number) {
    const clave = await this.prisma.clave.findUnique({
      where: {
        id,
      },
      include: {
        dependencia: true,
      },
    });

    return clave;
  }

  async update(id: number,updateClaveDto: UpdateClaveDto) {
    console.log('Service: Updating clave with ID:', id);
    console.log('UpdateClaveDto:', updateClaveDto);
  
    try {
      const { dependenciaId, clave } = updateClaveDto;
  
      const claveUpdated = await this.prisma.clave.update({
        where: {
          id,
        },
        data: {
          dependenciaId: dependenciaId, // Corrección aquí
          clave,
        },
      });
  
      console.log('Service: Clave updated:', claveUpdated);
  
      return claveUpdated;
    } catch (error) {
      console.error('Service: Error updating clave:', error);
      throw new Error('Error updating clave: ' + error.message);
    }
  }

  async remove(id: number) {
    const claveDeleted = await this.prisma.clave.delete({
      where: {
        id,
      },
    });

    return claveDeleted;
  }
}