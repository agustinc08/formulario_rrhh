import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { RespuestasService } from './respuestas.service';
import { Respuesta } from '@prisma/client';

@Controller('respuestas')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestasService) {}

  @Post()
  async createRespuesta(@Body() createRespuestaDto: CreateRespuestaDto) {
    const respuesta = await this.respuestaService.createRespuestas(
      createRespuestaDto,
    );
    return respuesta;
  }

  @Get('pregunta')
  async getRespuestasByPreguntaIds(
    @Query('ids') preguntaIds: string,
  ): Promise<Respuesta[]> {
    const idPreguntas = preguntaIds.split(',').map((id) => parseInt(id, 10));
    return this.respuestaService.getRespuestasByPreguntaIds(idPreguntas);
  }
  
  @Get('dependencia')
  async getRespuestasByDependenciaIds(
    @Query('ids') dependenciaIds: string,
  ): Promise<Respuesta[]> {
    const idDependencias = dependenciaIds.split(',').map((id) => parseInt(id, 10));
    return this.respuestaService.getRespuestasByDependenciaIds(idDependencias);
  }
  
  @Get('formulario')
  async getRespuestasByFormularioId(
    @Query('ids') formularioId: string,
  ): Promise<Respuesta[]> {
    return this.respuestaService.getRespuestasByFormularioId(parseInt(formularioId, 10));
  }
  
  @Get(':preguntaId/:dependenciaId/:formularioId')
  async buscarRespuestas(
    @Param('preguntaId') preguntaId: string,
    @Param('dependenciaId') dependenciaId: string,
    @Param('formularioId') formularioId: string,
  ): Promise<Respuesta[]> {
    const idPregunta = parseInt(preguntaId, 10);
    const idDependencia = parseInt(dependenciaId, 10);
    const idFormulario = parseInt(formularioId, 10);
  
    console.log('Pregunta ID:', idPregunta);
    console.log('Dependencia ID:', idDependencia);
    console.log('Formulario ID:', idFormulario);
  
    return this.respuestaService.buscarRespuestas(
      [idPregunta],
      [idDependencia],
      [idFormulario],
    );
  }

  @Get()
  findAll() {
    return this.respuestaService.findAll();
  }

  @Get(':id')
  async getRespuestaById(@Param('id') id: string): Promise<Respuesta> {
    const respuestaId = parseInt(id, 10);
    return this.respuestaService.findRespuestaById(respuestaId);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaService.remove(+id);
  }
}
