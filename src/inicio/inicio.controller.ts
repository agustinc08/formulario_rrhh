import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InicioService } from './inicio.service';

@Controller('inicio')
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

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
    return this.inicioService.createInicio(inicioData);
  }
}