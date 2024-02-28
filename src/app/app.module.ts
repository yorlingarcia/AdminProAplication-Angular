import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent, NopageFoundComponent],
  imports: [AppRoutingModule, AuthModule, BrowserModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
