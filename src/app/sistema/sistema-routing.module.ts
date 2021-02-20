import { SistemaTabelaComponent } from './tabela/tabela.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfisSistema } from '../authorization/perfis-sistema';

const routes: Routes = [
  {
    path: '',
    component: SistemaTabelaComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule {}
