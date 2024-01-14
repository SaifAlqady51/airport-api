import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(options);
    await app.listen(4000);
}
bootstrap();
