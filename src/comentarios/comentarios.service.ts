import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComentariosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createComentarioDto: CreateComentarioDto) {
    const comentario = await this.prismaService.comentario.create({
      data: createComentarioDto,
    });
    return comentario;
  }

  async findAll() {
    const comentarios = await this.prismaService.comentario.findMany({
      include: { respuesta: true },
    });
    return comentarios;
  }

  async findOne(id: number) {
    const comentario = await this.prismaService.comentario.findUnique({
      where: { id },
      include: { respuesta: true },
    });
    return comentario;
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto) {
    const comentario = await this.prismaService.comentario.update({
      where: { id },
      data: updateComentarioDto,
      include: { respuesta: true },
    });
    return comentario;
  }

  async remove(id: number) {
    const comentario = await this.prismaService.comentario.delete({
      where: { id },
      include: { respuesta: true },
    });
    return comentario;
  }
}