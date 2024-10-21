import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  // return usuarioService.role === 'ADMIN_ROLE' ? true : (false);

  if (usuarioService.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};
