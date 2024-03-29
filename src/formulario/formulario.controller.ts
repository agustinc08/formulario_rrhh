import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { Formulario, Prisma } from '@prisma/client';

@Controller('formulario')
export class FormularioController {
  constructor(private formularioService: FormularioService) {}

  @Post()
  async create(
    @Body() data: Prisma.FormularioCreateInput,
  ): Promise<Formulario> {
    return this.formularioService.create(data);
  }

  @Get(':formularioId/secciones')
  async obtenerSeccionesPorFormulario(
    @Param('formularioId') formularioId: number,
  ) {
    try {
      const secciones = await this.formularioService.getSeccionesPorFormulario(
        formularioId,
      );
      return secciones;
    } catch (error) {
      throw new Error(
        `Error al obtener las secciones del formulario: ${error.message}`,
      );
    }
  }

  @Get(':formularioId/secciones/activas')
  async getSeccionesActivasPorFormulario(
    @Param('formularioId') formularioId: number,
  ) {
    return this.formularioService.getSeccionesActivasPorFormulario(
      formularioId,
    );
  }

  @Get()
  async findAll(): Promise<Formulario[]> {
    return this.formularioService.findAll();
  }

  @Get(':dependenciaId/formularios')
  async obtenerFormulariosPorDependencia(
    @Param('dependenciaId') dependenciaId: number,
  ) {
    try {
      const formularios =
        await this.formularioService.getFormulariosPorDependencia(
          dependenciaId,
        );
      return formularios;
    } catch (error) {
      throw new Error(
        `Error al obtener los formularios de la dependencia: ${error.message}`,
      );
    }
  }

  @Get('activo/:formularioId')
  async findActiveFormulario(
    @Param('formularioId') formularioId: string,
  ): Promise<Formulario | null> {
    return this.formularioService.findActiveFormulario(Number(formularioId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Formulario | null> {
    return this.formularioService.findOne(Number(id));
  }

  @Put(':id')
  async updateEstado(
    @Param('id') id: string,
    @Body() data: { estaActivo: boolean },
  ): Promise<Formulario | null> {
    return this.formularioService.updateFormularioEstado(Number(id), data.estaActivo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Formulario | null> {
    return this.formularioService.delete(Number(id));
  }

  @Get(':formularioId/tiposRespuesta')
  async obtenerTiposRespuestaPorFormulario(
    @Param('formularioId') formularioId: number,
  ) {
    try {
      const tiposRespuesta = await this.formularioService.getTiposRespuestaPorFormulario(
        formularioId,
      );
      return tiposRespuesta;
    } catch (error) {
      throw new Error(
        `Error al obtener los tipos de respuesta del formulario: ${error.message}`,
      );
    }
  }

}
