import { Module } from '@nestjs/common';
import { DependenciasService } from './dependencias.service';
import { DependenciasController } from './dependencias.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DependenciasController],
  providers: [DependenciasService,PrismaService]
})
export class DependenciasModule {}
