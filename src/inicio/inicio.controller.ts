import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { InicioService } from './inicio.service';

@Controller('inicio')
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

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

  @Get('/verificar/:formularioId')
  async verificarInicioExistente(@Param('formularioId') formularioId: string) {
    const id = parseInt(formularioId);
    const inicio = await this.inicioService.verificarInicioPorFormulario(id);
    console.log(inicio)
    return inicio;
  }

   @Get('active') 
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

  @Put(':id')
  async updateInicio(@Param('id') id: number, @Body() data: any) {
    return this.inicioService.updateInicio(id, data);
  }

  @Get()
  async getInicio() {
    return this.inicioService.findAll();
  }

  @Get('uno')
  async getOneInicio() {
    return this.inicioService.getInicio();
  }

  @Get(':id')
  async getInicioPorId(@Param('id') id: number) {
    return this.inicioService.getInicioPorId(id);
  }
  
}