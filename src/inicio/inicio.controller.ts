import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InicioService } from './inicio.service';

@Controller('inicio')
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

   @Get('active') // New endpoint to fetch the active inicio
  async getActiveInicio() {
    try {
      const inicio = await this.inicioService.getActiveInicio();
      return inicio;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async getInicio() {
    return this.inicioService.getInicio();
  }

  @Get(':id')
  async getInicioPorId(@Param('id') id: number) {
    return this.inicioService.getInicioPorId(id);
  }
  
  @Post()
  async createInicio(@Body() inicioData: any) {
    try {
      const inicio = await this.inicioService.createInicio(inicioData);
      return {
        success: true,
        message: 'Inicio creado correctamente',
        inicio,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}