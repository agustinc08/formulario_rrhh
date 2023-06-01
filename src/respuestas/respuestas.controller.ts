import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { RespuestasService } from './respuestas.service';
import { Respuesta } from '@prisma/client';

@Controller('respuestas')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestasService) {}

  @Post()
  async createRespuesta(@Body() createRespuestaDto: CreateRespuestaDto) {
    console.log(createRespuestaDto)
    return this.respuestaService.createRespuesta(createRespuestaDto);
  }

  @Get(':preguntaId/:dependenciaId')
  async buscarRespuestas(
    @Param('preguntaId') preguntaId: string,
    @Param('dependenciaId') dependenciaId: string,
  ): Promise<Respuesta[]> {
    const idPregunta = parseInt(preguntaId, 10);
    const idDependencia = parseInt(dependenciaId, 10);
    return this.respuestaService.buscarRespuestas(idPregunta, idDependencia);
  }

  @Get()
  findAll() {
    return this.respuestaService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.respuestaService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaService.remove(+id);
  }



  
}