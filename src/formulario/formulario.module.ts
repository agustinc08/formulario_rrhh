import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FormularioController],
  providers: [FormularioService,PrismaService]
})
export class FormularioModule {}
