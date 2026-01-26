import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../models/error-models/api-error.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error Interceptor : ', error);

      switch (error.status) {
        case 500:
        case 0:
          router.navigate(['/', 'error', '500']);
          break;
      }

      const errorMessage = error.error.error;

      return throwError(() => new ApiError(errorMessage));
    }),
  );
};
