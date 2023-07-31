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

  // Use the new method to fetch secciones with an active formulario
  @Get('conFormularioActivo')
  async buscarSeccionesConFormularioActivo(): Promise<Seccion[]> {
    return this.seccionesService.buscarSeccionesConFormularioActivo();
  }

  @Get(':id')
  async buscarSeccionPorId(@Param('id') id: string): Promise<Seccion | null> {
    const parsedId = parseInt(id, 10); // Parse the id string to an integer

    if (isNaN(parsedId)) {
      throw new Error('Invalid id provided. Expected a valid integer.');
    }

    return this.seccionesService.buscarSeccionPorId(parsedId);
  }11

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
