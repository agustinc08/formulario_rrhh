import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TipoPregunta } from '@prisma/client';
import { TipoPreguntaService } from './tipo-pregunta.service';


@Controller('tipoPregunta')
export class TipoPreguntaController {
  constructor(private readonly tipoPreguntaService: TipoPreguntaService) {}

  @Get()
  findAll(): Promise<TipoPregunta[]> {
    return this.tipoPreguntaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<TipoPregunta | null> {
    return this.tipoPreguntaService.findById(Number(id));
  }

  @Post()
  create(@Body() data: TipoPregunta): Promise<TipoPregunta> {
    return this.tipoPreguntaService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: TipoPregunta): Promise<TipoPregunta | null> {
    return this.tipoPreguntaService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<TipoPregunta | null> {
    return this.tipoPreguntaService.delete(Number(id));
  }
}
