import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { RespuestasService } from './respuestas.service';

@Controller('respuestas')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestasService) {}

  @Post()
  async createRespuesta(@Body() createRespuestaDto: CreateRespuestaDto) {
    console.log(createRespuestaDto)
    return this.respuestaService.createRespuesta(createRespuestaDto);
  }

  @Get()
  findAll() {
    return this.respuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestaService.findOne(+id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaService.remove(+id);
  }
}