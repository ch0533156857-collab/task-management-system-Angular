import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
        switch (error.status) {
          case 401: 
            errorMessage = 'your session has expired. please log in again.';
            localStorage.removeItem('auth_token');
            localStorage.removeItem('current_user');
            router.navigate(['/login']);
            break;

          case 403: 
            errorMessage = 'You are not authorized to access this resource.';
            break;

          case 404: 
            errorMessage = 'The resource was not found.';
            break;

          case 500: 
            errorMessage = 'Server error. Please try again later.';
            break;

          default:
            errorMessage = error.error?.message || 'An unexpected error occurred.';
        }
    }
      console.error('Error Interceptor:', errorMessage, error);
      
      // return throwError(() => new Error(errorMessage));
      return throwError(() => error);
    }));
};