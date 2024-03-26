import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login-service/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token_sesion = sessionStorage.getItem("token");
  const router = inject(Router)

  if (token_sesion == null && token_sesion == undefined) {
    router.navigate(['/login']);
  }
  return true;
};
