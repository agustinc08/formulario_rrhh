import { Module } from '@nestjs/common';
import { ClavesService } from './claves.service';
import { ClavesController } from './claves.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClavesController],
  providers: [ClavesService,PrismaService ]
})
export class ClavesModule {}
