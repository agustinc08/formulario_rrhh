import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
});
  await app.listen(3000);
  const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
}
bootstrap();
