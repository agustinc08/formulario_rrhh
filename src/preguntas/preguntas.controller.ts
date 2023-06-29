import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { PreguntasService } from './preguntas.service';
import { Pregunta } from '@prisma/client';

@Controller('preguntas')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntasService) {}

  @Post()
  async createPregunta(@Body() data: any): Promise<Pregunta> {
    return this.preguntaService.createPregunta(data);
  }
  
  @Get()
  findAll() {
    return this.preguntaService.findAll();
  }

  @Get('/:seccionId')
async getPreguntasPorSeccion(@Param('seccionId') seccionId: string) {
  const id = parseInt(seccionId); // Convertir a número
  return this.preguntaService.getPreguntasPorSeccion(id);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntaService.update(+id, updatePreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preguntaService.remove(+id);
  }
}