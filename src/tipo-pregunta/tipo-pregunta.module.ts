import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TipoPreguntaService } from './tipo-pregunta.service';
import { TipoPreguntaController } from './tipo-pregunta.controller';

@Module({
  providers: [TipoPreguntaService,PrismaService],
  controllers: [TipoPreguntaController]
})
export class TipoPreguntaModule {}
