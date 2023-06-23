import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { Formulario } from '@prisma/client';


@Controller('formulario')
export class FormularioController {
  constructor(private formularioService: FormularioService) {}

  @Get()
  async findAll(): Promise<Formulario[]> {
    return this.formularioService.findAll();
  }

  @Get(':dependenciaId/formularios')
  async obtenerFormulariosPorDependencia(@Param('dependenciaId') dependenciaId: number) {
    try {
      const formularios = await this.formularioService.getFormulariosPorDependencia(dependenciaId);
      return formularios;
    } catch (error) {
      throw new Error(`Error al obtener los formularios de la dependencia: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Formulario | null> {
    return this.formularioService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: Formulario): Promise<Formulario> {
    return this.formularioService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Formulario): Promise<Formulario | null> {
    return this.formularioService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Formulario | null> {
    return this.formularioService.delete(Number(id));
  }
}
