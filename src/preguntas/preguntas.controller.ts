import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { PreguntasService } from './preguntas.service';

@Controller('preguntas')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntasService) {}

  @Post()
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntaService.create(createPreguntaDto);
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