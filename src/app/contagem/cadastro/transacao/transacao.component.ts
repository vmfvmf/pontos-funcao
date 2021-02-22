import { ContagemItemService } from './../../contagem-item.service';
import { MensagemTelaComponent } from './mensagem-tela/mensagem-tela.component';
import { GrupoComponent } from './grupo/grupo.component';
import { TransacaoCadastroComponent } from './cadastro/cadastro.component';
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Contagem } from "../../contagem";
import { MessageService } from 'pje-componentes';
import { Transacao } from './transacao';
import { Grupo } from './grupo/grupo';
import { ContagemItem, TipoContagemItemEnum } from '../../contagem-item';

@Component({
  selector: 'app-contagem-cadastro-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.scss'],
})
export class TransacaoComponent implements OnInit {
  @Input()
  contagem: Contagem;
  transacaos: Transacao[] = [];
  subTotalPf = 0;
  constructor(
    public dialog: MatDialog,
    private transacaoService: ContagemItemService,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.updateTableData();
  }

  pfSubtotalAL(){
    this.subTotalPf = 0;
    if(this.contagem && this.contagem.arquivoReferenciado) this.contagem.arquivoReferenciado.forEach(fd => {
      this.subTotalPf += fd.pf;
    });
  }

  updateTableData() {
    this.transacaoService.listar({contagem: this.contagem, tipo: TipoContagemItemEnum.TRANSACAO}).subscribe(response => {
      this.transacaos = <Transacao[]>response;
      console.log('TRANSACAO[]', response);
    }, error => {
      console.log('erro ao recuperar transacao[]', error);
      this.msgService.error("Ocorreu um erro ao recuperar dados do banco.");
    });
  }

  novoEditar(transacao: Transacao) {
    if (!transacao) transacao = new Transacao({ contagem: this.contagem });
    const dialogRef = this.dialog.open(TransacaoCadastroComponent, {
      width: '600px',
      data: { transacao: transacao }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.updateTableData();
    });
  }

  gerenciadorMensagensTelas(){
    this.dialog.open(MensagemTelaComponent, {
      width: '600px'
    });
  }

  gerenciadorGrupo() {
    let grupo = new Grupo({ contagem: {id: this.contagem.id} });
    this.dialog.open(GrupoComponent, {
      width: '600px',
      data: { grupo: grupo }
    });
  }


  apagar(arquivoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.transacaoService.apagar(arquivoId).subscribe(
      (msg) => {
        this.updateTableData();
        this.msgService.success('Registro apagado com sucesso.');
      },
      (erro) => {
        console.log("Erro ao apagar arquivo", erro)
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }

}
