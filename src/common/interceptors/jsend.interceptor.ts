import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { JSendSuccessResponse } from '../interfaces'

@Injectable()
export class JsendInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (data === undefined) {
          data = null
        }

        const response: JSendSuccessResponse<typeof data> = {
          status: 'success',
          data,
        }
        return response
      }),
    )
  }
}
