import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

export const authLoadGuard: CanActivateChildFn = (childRoute, state) => {
  const userService = inject(UsuarioService);
  const router = inject(Router);

  return userService.validateToken().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
