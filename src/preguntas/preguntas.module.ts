import { Module } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { PreguntaController } from './preguntas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PreguntasService,PrismaService],
  controllers: [PreguntaController]
})
export class PreguntasModule {}
