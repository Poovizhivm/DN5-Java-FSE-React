import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Unauthorized (401) error intercepted. Navigating to dashboard.');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Global HTTP 500 error intercepted:', error);
      }
      return throwError(() => error);
    })
  );
};
