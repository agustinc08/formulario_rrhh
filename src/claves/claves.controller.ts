import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClavesService } from './claves.service';
import { CreateClaveDto } from './dto/create-clave.dto';
import { UpdateClaveDto } from './dto/update-clave.dto';

@Controller('claves')
export class ClavesController {
  constructor(private readonly clavesService: ClavesService) {}

  @Post()
  create(@Body() createClaveDto: CreateClaveDto) {
    return this.clavesService.create(createClaveDto);
  }

  @Get()
  findAll() {
    return this.clavesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clavesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaveDto: UpdateClaveDto) {
    console.log('Updating clave with ID:', id);
    console.log('UpdateClaveDto:', updateClaveDto);
    return this.clavesService.update(+id, updateClaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clavesService.remove(+id);
  }
}
