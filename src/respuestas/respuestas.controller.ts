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

  @Get(':preguntaIds/:dependenciaIds/:formularioId')
  async buscarRespuestas(
    @Param('preguntaIds') preguntaIds: string,
    @Param('dependenciaIds') dependenciaIds: string,
    @Param('formularioId') formularioId: string,
  ): Promise<Respuesta[]> {
    const idPreguntas = preguntaIds.split(',').map(id => parseInt(id, 10));
    const idDependencias = dependenciaIds.split(',').map(id => parseInt(id, 10));
    const idFormulario = parseInt(formularioId, 10);
  
    console.log('Pregunta IDs:', idPreguntas);
    console.log('Dependencia IDs:', idDependencias);
    console.log('Formulario ID:', idFormulario);
  
    return this.respuestaService.buscarRespuestas(
      idPreguntas,
      idDependencias,
      idFormulario,
    );
  }

  @Get(':preguntaIds/:dependenciaIds')
  async buscarRespuestasPorPreguntaYDependencia(
    @Param('preguntaIds') preguntaIds: string,
    @Param('dependenciaIds') dependenciaIds: string,
  ): Promise<Respuesta[]> {
    const idPreguntas = preguntaIds.split(',').map(id => parseInt(id, 10));
    const idDependencias = dependenciaIds.split(',').map(id => parseInt(id, 10));
  
    console.log('Pregunta IDs:', idPreguntas);
    console.log('Dependencia IDs:', idDependencias);
  
    return this.respuestaService.buscarRespuestasPorPreguntaYDependencia(
      idPreguntas,
      idDependencias,
    );
  }

  @Get(':preguntaIds/:formularioId')
  async buscarRespuestasPorPreguntaYFormulario(
    @Param('preguntaIds') preguntaIds: string,
    @Param('formularioId') formularioId: string,
  ): Promise<Respuesta[]> {
    const idPreguntas = preguntaIds.split(',').map(id => parseInt(id, 10));
    const idFormulario = parseInt(formularioId, 10);
  
    console.log('Pregunta IDs:', idPreguntas);
    console.log('Formulario ID:', idFormulario);
  
    return this.respuestaService.buscarRespuestasPorPreguntaYFormulario(
      idPreguntas,
      idFormulario,
    );
  }

  @Get(':dependenciasId/:formularioId')
  async buscarRespuestasPorDependenciaYFormulario(
    @Param('dependenciasId') dependenciasId: string,
    @Param('formularioId') formularioId: string,
  ): Promise<Respuesta[]> {
    const idDependencias = dependenciasId.split(',').map(id => parseInt(id, 10));
    const idFormulario = parseInt(formularioId, 10);
  
    console.log('Dependencia IDs:', idDependencias);
    console.log('Formulario ID:', idFormulario);
  
    return this.respuestaService.buscarRespuestasPorPreguntaYFormulario(
      idDependencias,
    idFormulario,
    );
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
