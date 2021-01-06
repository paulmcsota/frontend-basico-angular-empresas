import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { DetailEmpresaComponent } from './components/detail-empresa/detail-empresa.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      EmpresasComponent,
      DetailEmpresaComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      Ng2SmartTableModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
