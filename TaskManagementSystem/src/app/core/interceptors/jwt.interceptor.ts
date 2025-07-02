import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(AuthService);
  if(!authService.token()){
    return next(req);
  }

  const cloneReq=req.clone({
    setHeaders:{
      Authorization:`Bearer ${authService.token()}`
    },
    
  });
  console.log('Intercepting request:', cloneReq);
  return next(cloneReq);
};


