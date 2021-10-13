import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfisSistema } from '../authorization/perfis-sistema';
import { ProjetoTabelaComponent } from './tabela/tabela.component';

const routes: Routes = [
  {
    path: '',
    component: ProjetoTabelaComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule {}
