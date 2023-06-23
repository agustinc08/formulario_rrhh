import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Seccion } from '.prisma/client';
import { SeccionesService } from './seccionesServices';

@Controller('secciones')
export class SeccionesController {
  constructor(private seccionesService: SeccionesService) {}

  @Post()
  async crearSeccion(@Body('descripcion') descripcion: string, @Body('formularioId') formularioId: number): Promise<Seccion> {
    return this.seccionesService.crearSeccion(formularioId, descripcion);
  }

  @Get()
  async buscarTodasLasSecciones(): Promise<Seccion[]> {
    return this.seccionesService.buscarTodasLasSecciones();
  }

  @Get(':id')
  async buscarSeccionPorId(@Param('id') id: string): Promise<Seccion | null> {
    return this.seccionesService.buscarSeccionPorId(Number(id));
  }

  @Put(':id')
  async actualizarSeccion(
    @Param('id') id: string,
    @Body('descripcion') descripcion: string,
  ): Promise<Seccion> {
    return this.seccionesService.actualizarSeccion(Number(id), descripcion);
  }

  @Delete(':id')
  async eliminarSeccion(@Param('id') id: string): Promise<Seccion> {
    return this.seccionesService.eliminarSeccion(Number(id));
  }
}
