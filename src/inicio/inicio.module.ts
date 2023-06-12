import { Module } from '@nestjs/common';
import { InicioService } from './inicio.service';
import { InicioController } from './inicio.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [InicioService,PrismaService],
    controllers: [InicioController]
  })
export class InicioModule {}
