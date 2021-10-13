import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Trt15AcessoNegadoComponent } from 'trt15-base-app';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'projetos',
        loadChildren:
          './projeto/projeto.module#ProjetoModule',
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
