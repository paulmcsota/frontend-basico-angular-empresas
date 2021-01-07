import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { DetailEmpresaComponent } from './pages/detail-empresa/detail-empresa.component';

import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
   declarations: [
      AppComponent,
      DetailEmpresaComponent,
      EmpresasComponent,
   ],
   imports: [
      AppRoutingModule,
      BrowserModule,
      ComponentsModule,
      HttpClientModule,
      Ng2SmartTableModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
