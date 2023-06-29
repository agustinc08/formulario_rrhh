import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { RespuestasService } from './respuestas.service';
import { Respuesta } from '@prisma/client';

@Controller('respuestas')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestasService) {}

  @Post()
  async createRespuesta(@Body() data: any): Promise<Respuesta> {
    return this.respuestaService.createRespuesta(data);
  }

  @Get('pregunta/:preguntaId')
  async getRespuestasByPreguntaId(
    @Param('preguntaId') preguntaId: string,
  ): Promise<Respuesta[]> {
    return this.respuestaService.getRespuestasByPreguntaId(
      parseInt(preguntaId),
    );
  }

  @Get('dependencia/:dependenciaId')
  async getRespuestasByDependenciaId(
    @Param('dependenciaId') dependenciaId: string,
  ): Promise<Respuesta[]> {
    return this.respuestaService.getRespuestasByDependenciaId(
      parseInt(dependenciaId),
    );
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