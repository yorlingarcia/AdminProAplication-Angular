import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './features/auth/auth.routing';
import { LayoutRoutingModule } from './layouts/layout.routing';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopageFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
    LayoutRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
