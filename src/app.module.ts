import { Module } from '@nestjs/common';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { DependenciasModule } from './dependencias/dependencias.module';
import { ClavesModule } from './claves/claves.module';
import { SeccionesModule } from './secciones/seccionesModule';
import { InicioModule } from './inicio/inicio.module';
import { FormularioModule } from './formulario/formulario.module';
import { TipoPreguntaModule } from './tipo-pregunta/tipo-pregunta.module';
import { TipoRespuestaModule } from './tipo-respuesta/tipo-respuesta.module';


@Module({
  imports: [PreguntasModule, RespuestasModule, ComentariosModule, DependenciasModule, 
    ClavesModule, SeccionesModule, InicioModule, FormularioModule,TipoPreguntaModule,TipoRespuestaModule],
  controllers: [],
  providers: []
})
export class AppModule {}
