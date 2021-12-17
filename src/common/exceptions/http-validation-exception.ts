import {
  HttpException,
  HttpStatus,
  ValidationError as NestValidationError,
} from '@nestjs/common'
import { ValidationError } from '../interfaces'

export class HttpValidationException extends HttpException {
  constructor(validationErrors: NestValidationError[]) {
    let errors: ValidationError[] = []

    for (const error of validationErrors) {
      errors = errors.concat(HttpValidationException.exportErrors(error))
    }

    super(errors, HttpStatus.OK)
  }

  private static exportErrors(
    error: NestValidationError,
    propertyPrefix = '',
  ): ValidationError[] {
    let errors: ValidationError[] = []

    for (const constraint in error.constraints) {
      errors.push({
        property: propertyPrefix + error.property,
        constraint,
        error: error.constraints[constraint],
      })
    }

    error.children.forEach((child) => {
      const childErrors = this.exportErrors(
        child,
        propertyPrefix + error.property + '.',
      )
      errors = errors.concat(childErrors)
    })

    return errors
  }
}
