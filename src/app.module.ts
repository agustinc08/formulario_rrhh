import { Module } from '@nestjs/common';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { DependenciasModule } from './dependencias/dependencias.module';
import { ClavesModule } from './claves/claves.module';
import { SeccionesModule } from './secciones/seccionesModule';


@Module({
  imports: [PreguntasModule, RespuestasModule, ComentariosModule, DependenciasModule, ClavesModule, SeccionesModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
