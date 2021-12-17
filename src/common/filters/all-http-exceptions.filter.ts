import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { HttpValidationException } from '../exceptions'
import {
  JSendErrorResponse,
  JSendFailResponse,
  ValidationError,
} from '../interfaces'

@Catch()
export class AllHttpExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    this.handleException(response, exception)
  }

  private handleException(response: Response, exception: unknown): void {
    if (exception instanceof HttpValidationException) {
      // If Validation Error => Respond with JSend Fail
      const errors = exception.getResponse() as ValidationError[]

      const result: JSendFailResponse<any> = {
        status: 'fail',
        data: errors.reduce((previous, current) => {
          previous[current.property] = current.error
          return previous
        }, {}),
      }

      response.status(400).send(result)
    } else if (exception instanceof HttpException) {
      const result: JSendErrorResponse = {
        status: 'error',
        code: exception.getStatus(),
        message: exception.message,
      }

      // Include stack trace
      // result.data = exception.stack

      response.status(exception.getStatus()).send(result)
    } else if (typeof (exception as any).message === 'string') {
      const result: JSendErrorResponse = {
        status: 'error',
        message: (exception as any).message,
      }

      // Include stack trace
      // result.data = exception

      response.status(500).send(result)
    } else {
      const result: JSendErrorResponse = {
        status: 'error',
        message: 'Unhandled error occurred',
        data: exception,
      }
      response.status(500).send(result)
    }
  }
}
