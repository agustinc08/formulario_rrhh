import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TipoRespuesta } from '@prisma/client';
import { TipoRespuestaService } from './tipo-respuesta.service';

@Controller('tipoRespuesta')
export class TipoRespuestaController {
  constructor(private readonly tipoRespuestaService: TipoRespuestaService) {}

  @Get()
  findAll(): Promise<TipoRespuesta[]> {
    return this.tipoRespuestaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<TipoRespuesta | null> {
    return this.tipoRespuestaService.findById(Number(id));
  }
  

  @Post()
  create(@Body() data: TipoRespuesta): Promise<TipoRespuesta> {
    return this.tipoRespuestaService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: TipoRespuesta): Promise<TipoRespuesta | null> {
    return this.tipoRespuestaService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<TipoRespuesta | null> {
    return this.tipoRespuestaService.delete(Number(id));
  }
}
