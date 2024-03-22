import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => next(req).pipe(catchError(handlerError));

function handlerError(error: HttpErrorResponse): ReturnType<typeof throwError> {
  const msg = `Error code: ${error.status}, message: ${error.message}`;
  return throwError(() => msg);
}
