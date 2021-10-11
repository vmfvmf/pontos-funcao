import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentesModule } from 'pje-componentes';
import { DedCadastroComponent } from './cadastro/cadastro.component';
import { DedRoutingModule } from './ded-routing.module';
import { DedService } from './ded.service';
import { NgModule } from '@angular/core';
import { DedTabelaComponent } from './tabela/tabela.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    DedRoutingModule,
    ComponentesModule,
    FlexLayoutModule,
    SharedModule
  ],
  providers: [
    DedService
  ],
  declarations: [ DedCadastroComponent, DedTabelaComponent ]
})
export class DedModule {}
