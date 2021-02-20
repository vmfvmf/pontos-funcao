
import { ContagemTabelaComponent } from './tabela/tabela.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfisSistema } from '../authorization/perfis-sistema';
import { ContagemCadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ContagemTabelaComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  },
  {
    path: 'editar',
    component: ContagemCadastroComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  },
  {
    path: 'editar/:contagemId',
    component: ContagemCadastroComponent,
    data: {
      perfisAcesso: [PerfisSistema.ADMINISTRADOR]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContagemRoutingModule {}
