import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

  @Get('pregunta/:preguntaId')
  async getRespuestasByPreguntaId(
    @Param('preguntaId') preguntaId: string,
  ): Promise<Respuesta[]> {
    return this.respuestaService.getRespuestasByPreguntaId(
      parseInt(preguntaId, 10),
    );
  }

  @Get('dependencia/:dependenciaId')
  async getRespuestasByDependenciaId(
    @Param('dependenciaId') dependenciaId: string,
  ): Promise<Respuesta[]> {
    return this.respuestaService.getRespuestasByDependenciaId(
      parseInt(dependenciaId, 10),
    );
  }

  @Get('formulario/:formularioId')
  async getRespuestasByFormularioId(
    @Param('formularioId') formularioId: string,
  ): Promise<Respuesta[]> {
    return this.respuestaService.getRespuestasByFormularioId(
      parseInt(formularioId, 10),
    );
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.respuestaService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaService.remove(+id);
  }
}
