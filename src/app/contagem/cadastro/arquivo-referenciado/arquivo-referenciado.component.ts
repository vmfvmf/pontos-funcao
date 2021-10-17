import { ArquivoReferenciadoService } from './arquivo-referenciado.service';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Contagem } from "../../contagem";
import { ArquivoReferenciado } from './arquivo-referenciado';
import { ArquivoReferenciadoCadastroComponent } from './cadastro/cadastro.component';
import { AbstractContagemItem } from '../../abstract-contagem-item';
import { MessageService } from '../../../shared/Service/message.service';
import { ContagemDadoSituacao } from '../../contagem-dado-situacao.enum';

@Component({
  selector: 'app-contagem-cadastro-arquivo-referenciado',
  templateUrl: './arquivo-referenciado.component.html',
  styleUrls: ['./arquivo-referenciado.component.scss'],
})
export class ArquivoReferenciadoComponent implements OnInit {
  @Input()
  contagem: Contagem;

  @Output()
  salvarContagem = new EventEmitter<{msg: String, item?: ArquivoReferenciado}>();

  @Input()
  somenteLeitura = true;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  novoEditar(arquivoReferenciado?: ArquivoReferenciado) {
    if (!arquivoReferenciado) {
      arquivoReferenciado = new ArquivoReferenciado();
    }
    const dialogRef = this.dialog.open(ArquivoReferenciadoCadastroComponent, {
      width: '600px',
      data: { arquivoReferenciado: arquivoReferenciado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const itm = Object.assign(new ArquivoReferenciado, result);
        this.salvarContagem.emit({msg: "Arquivo referenciado adicionado com sucesso!", item: itm});
      }
    });
  }

  visualizar(arquivoReferenciado: ArquivoReferenciado) {
    this.dialog.open(ArquivoReferenciadoCadastroComponent, {
      width: '600px',
      data: { arquivoReferenciado: arquivoReferenciado, somenteLeitura: true }
    });
  }

  apagar(arquivoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    const i = this.contagem.arquivosReferenciados.findIndex(ar => ar.id === arquivoId);
    this.contagem.arquivosReferenciados.splice(i, 1);
    this.salvarContagem.emit({msg: "Arquivo referenciado excluído com sucesso!"});
  }

  getTrClass(arquivo: ArquivoReferenciado) {
    return arquivo.alteradoDadoContagem === ContagemDadoSituacao.ALTERADO ? 'yellow' :
    arquivo.alteradoDadoContagem === ContagemDadoSituacao.NOVO ? 'green' : undefined;
  }
}
