import { ContagensComponent } from './contagens/contagens.component';
import { SprintsCadastroComponent } from './sprints/sprints-cadastro/sprints-cadastro.component';
import { SprintsComponent } from './sprints/sprints.component';
import { SistemasComponent } from './sistemas/sistemas.component';
import { DedsCadastroComponent } from './deds/deds-cadastro/deds-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DedsComponent } from './deds/deds.component';
import { SistemasCadastroComponent } from './sistemas/sistemas-cadastro/sistemas-cadastro.component';
import { ContagensDetalhesComponent } from './contagens/contagens-detalhes/contagens-detalhes.component';

const routes: Routes = [
  { path: 'deds/:id/sprints', component: SprintsComponent },
  { path: 'deds/:idDed/sprints/novo', component: SprintsCadastroComponent },
  { path: 'deds', component: DedsComponent },
  { path: 'deds/novo', component: DedsCadastroComponent },
  { path: 'deds/:id', component: DedsCadastroComponent },
  { path: 'contagens/:sprintId', component: ContagensComponent },
  { path: 'contagens/detalhe/:contagemId', component: ContagensDetalhesComponent },
  { path: 'sistemas', component: SistemasComponent },
  { path: 'sistemas/novo', component: SistemasCadastroComponent },
  { path: 'sistemas/editar/:id', component: SistemasCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
