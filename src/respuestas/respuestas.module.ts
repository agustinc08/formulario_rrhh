import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestaController } from './respuestas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RespuestasService,PrismaService],
  controllers: [RespuestaController]
})
export class RespuestasModule {}
