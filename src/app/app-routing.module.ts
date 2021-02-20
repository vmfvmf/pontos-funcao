import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Trt15Guard } from 'trt15-base-app';
import { Trt15HomeComponent } from 'trt15-base-app';
import { Trt15AcessoNegadoComponent } from 'trt15-base-app';

const routes: Routes = [
  {
    path: '',
    canActivate: [Trt15Guard],
    canActivateChild: [Trt15Guard],
    component: Trt15HomeComponent,
    data: {
      roleAcesso: 'page:home',
    },
    children: [
      {
        path: 'ded',
        loadChildren:
          './ded/ded.module#DedModule',
      },
      {
        path: 'sistema',
        loadChildren:
          './sistema/sistema.module#SistemaModule',
      },
      {
        path: 'sprint',
        loadChildren:
          './sprint/sprint.module#SprintModule',
      },
      {
        path: 'contagem',
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
