import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LoginService } from '../../services/login-service/login.service';

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.validateToken().pipe(
    map((isValid) => {
      console.log('isValid:', isValid)
      if (!isValid) {
        router.navigate(['login']);
        return false;
      }
      return true;
    }),
    catchError((err) => {
      router.navigate(['login']);
      return of(false);
    }
  ));
};
