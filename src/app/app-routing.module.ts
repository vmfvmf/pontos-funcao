import { DedTabelaComponent } from './ded/tabela/tabela.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Trt15AcessoNegadoComponent } from 'trt15-base-app';

const routes: Routes = [
  {
    path: '',
    component: DedTabelaComponent,
    children: [
      {
        path: 'deds',
        loadChildren:
          './ded/ded.module#DedModule',
      },
      {
        path: 'sistemas',
        loadChildren:
          './sistema/sistema.module#SistemaModule',
      },
      {
        path: 'sprints',
        loadChildren:
          './sprint/sprint.module#SprintModule',
      },
      {
        path: 'contagens',
        loadChildren:
          './contagem/contagem.module#ContagemModule',
      }
    ]
  },
  {
    path: 'acesso-negado',
    component: Trt15AcessoNegadoComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
