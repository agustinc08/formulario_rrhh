import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TipoRespuestaService } from './tipo-respuesta.service';
import { TipoRespuestaController } from './tipo-respuesta.controller';

@Module({
  providers: [TipoRespuestaService,PrismaService],
  controllers: [TipoRespuestaController]
})
export class TipoRespuestaModule {}
