import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { DetailEmpresaComponent } from './pages/detail-empresa/detail-empresa.component';

const routes: Routes = [
   { path: 'empresas', component: EmpresasComponent },
   { path: 'empresas/:nombre_empresa', component: DetailEmpresaComponent },
   { path: '', pathMatch: 'full', redirectTo: 'empresas' },
   { path: '**', pathMatch: 'full', redirectTo: 'empresas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
