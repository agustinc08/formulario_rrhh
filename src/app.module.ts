import { Module } from '@nestjs/common';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { DependenciasModule } from './dependencias/dependencias.module';
import { ClavesModule } from './claves/claves.module';
import { SeccionesModule } from './secciones/seccionesModule';
import { InicioModule } from './inicio/inicio.module';
import { FormularioController } from './formulario/formulario.controller';
import { FormularioService } from './formulario/formulario.service';
import { FormularioModule } from './formulario/formulario.module';


@Module({
  imports: [PreguntasModule, RespuestasModule, ComentariosModule, DependenciasModule, 
    ClavesModule, SeccionesModule, InicioModule, FormularioModule],
  controllers: [],
  providers: []
})
export class AppModule {}
