// import { Component } from '@angular/core';
// import { UsuarioService } from '../../services/usuario.service';
// import { User } from '../../models/user.model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styles: ``,
// })
// export class HeaderComponent {
//   public usuario: User;
//   constructor(private usuarioService: UsuarioService, private router: Router) {
//     this.usuario = usuarioService.usuario;
//   }

//   logOut() {
//     this.usuarioService.logOut();
//   }

//   buscar(termino: string) {
//     if (termino.trim().length === 0) {
//       this.router.navigateByUrl('/dashboard');
//       return;
//     }
//     this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
//   }
// }
