import { Injectable } from '@nestjs/common';
import { Prisma, Respuesta, RespuestaCalificacionEnum, RespuestaClasificacionEnum, RespuestaExpresionEnum, RespuestaGradoEnum } from '@prisma/client';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}

   async createRespuesta(createRespuestaDto: CreateRespuestaDto) {
    try {
      const { respuestas, edad, genero } = createRespuestaDto;
  
      const respuestaPromises = respuestas.map(async (respuesta) => {
        const { preguntaId, dependenciaId, respuestaText, comentario } = respuesta;
  
        let respuestaExpresion: RespuestaExpresionEnum | undefined;
        let respuestaCalificacion: RespuestaCalificacionEnum | undefined;
        let respuestaClasificacion: RespuestaClasificacionEnum | undefined;
        let respuestaGrado: RespuestaGradoEnum | undefined;
        let comentarios: Prisma.ComentarioCreateNestedManyWithoutRespuestaInput | undefined;
  
        if (respuestaText === RespuestaExpresionEnum.SI || respuestaText === RespuestaExpresionEnum.NO || respuestaText === RespuestaExpresionEnum.NO_SE) {
          respuestaExpresion = respuestaText;
        } else if (respuestaText === RespuestaCalificacionEnum.MUY_BUENO || respuestaText === RespuestaCalificacionEnum.BUENO || respuestaText === RespuestaCalificacionEnum.REGULAR || respuestaText === RespuestaCalificacionEnum.MALO || respuestaText === RespuestaCalificacionEnum.MUY_MALO) {
          respuestaCalificacion = respuestaText;
        } else if (respuestaText === RespuestaClasificacionEnum.CASI_SIEMPRE || respuestaText === RespuestaClasificacionEnum.SIEMPRE || respuestaText === RespuestaClasificacionEnum.AVECES || respuestaText === RespuestaClasificacionEnum.CASI_NUNCA || respuestaText === RespuestaClasificacionEnum.NUNCA) {
          respuestaClasificacion = respuestaText;
        } else if (respuestaText === RespuestaGradoEnum.ALTA || respuestaText === RespuestaGradoEnum.MEDIA || respuestaText === RespuestaGradoEnum.BAJA) {
          respuestaGrado = respuestaText;
        }
  
        const respuestaData: Prisma.RespuestaCreateInput = {
          dependencia: { connect: { id: dependenciaId } },
          edad,
          genero,
          pregunta: { connect: { id: preguntaId } }, // Use the converted id
        };
  
        if (respuestaExpresion) {
          respuestaData.expresion = respuestaExpresion;
        }
        if (respuestaCalificacion) {
          respuestaData.calificaciones = respuestaCalificacion;
        }
        if (respuestaClasificacion) {
          respuestaData.clasificaciones = respuestaClasificacion;
        }
        if (respuestaGrado) {
          respuestaData.grado = respuestaGrado;
        }
  
        if (comentario !== null) {
          comentarios = {
            create: [
              {
                comentario,
              },
            ],
          };
          respuestaData.comentarios = comentarios;
        } else {
          respuestaData.comentarios = undefined;
        }
  
        const createdRespuesta = await this.prisma.respuesta.create({
          data: respuestaData,
        });
  
        return createdRespuesta;
      });
  
      const createdRespuestas = await Promise.all(respuestaPromises);
      console.log(createdRespuestas);
  
      return createdRespuestas;
    } catch (error) {
      console.error('Error creating respuesta:', error);
      throw error;
    }
  }

  async findAll(): Promise<Respuesta[]> {
    const respuestas = await this.prisma.respuesta.findMany({
      include: {
        comentarios: true,
      },
    });
    return respuestas;
  }

  async findOne(id: number): Promise<Respuesta> {
    const respuesta = await this.prisma.respuesta.findUnique({
      where: { id },
      include: {
        comentarios: true,
      },
    });
    return respuesta;
  }

 

  async remove(id: number): Promise<Respuesta> {
    const deletedRespuesta = await this.prisma.respuesta.delete({
      where: { id },
    });
    return deletedRespuesta;
  }
}
