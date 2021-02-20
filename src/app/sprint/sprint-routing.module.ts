import { SprintTabelaComponent } from './tabela/tabela.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfisSistema } from '../authorization/perfis-sistema';

const routes: Routes = [
  {
    path: '',
    component: SprintTabelaComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule {}
