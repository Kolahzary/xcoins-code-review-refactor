import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  AllHttpExceptionsFilter,
  HttpValidationException,
  JsendInterceptor,
} from './common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  Logger.log('App Module Created')

  // Enable request validation with custom messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory: (errors) => new HttpValidationException(errors),
    }),
  )

  // Add JSend exception filters
  const filter = app.get<AllHttpExceptionsFilter>(AllHttpExceptionsFilter)
  app.useGlobalFilters(filter)

  // Add JSend interceptors
  app.useGlobalInterceptors(new JsendInterceptor())

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGINS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })

  // Start listening for connections
  await app.listen(process.env.PORT)
}
bootstrap()
