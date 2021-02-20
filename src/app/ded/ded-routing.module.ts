import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfisSistema } from '../authorization/perfis-sistema';
import { DedTabelaComponent } from './tabela/tabela.component';

const routes: Routes = [
  {
    path: '',
    component: DedTabelaComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DedRoutingModule {}
