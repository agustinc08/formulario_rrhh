import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SeccionesService } from './seccionesServices';
import { SeccionesController } from './seccionesController';

@Module({
  providers: [SeccionesService,PrismaService],
  controllers: [SeccionesController]
})
export class SeccionesModule {}
