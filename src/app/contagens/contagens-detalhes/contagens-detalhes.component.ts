import { TransacaoService } from './contagens-transacoes/transacao.service';
import { FuncoesTransacao, TipoItemContagemEnum } from './../item-contagem';
import { GrupoTransacao } from './contagens-transacoes/contagens-grupo-transacoes/grupo-transacao';
import { Transacao } from './contagens-transacoes/transacao';
import { TabelasService } from '../tabelas.service';
import { MessageService } from './../../shared/message-service';
import { FuncaoDadosService } from './contagens-funcao-dados/funcao-dados.service';
import { ContagensService } from './../contagens.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contagem } from '../contagem';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FuncaoDados } from './contagens-funcao-dados/funcao-dados';
import { ContagensFuncaoDadosComponent } from './contagens-funcao-dados/contagens-funcao-dados.component';
import { ContagensTransacoesComponent } from './contagens-transacoes/contagens-transacoes.component';
import { ContagensMensagensTelasComponent } from './contagens-transacoes/contagens-mensagens-telas/contagens-mensagens-telas.component';
import { ContagensGrupoTransacoesComponent } from './contagens-transacoes/contagens-grupo-transacoes/contagens-grupo-transacoes.component';

@Component({
  selector: 'app-contagens-detalhes',
  templateUrl: './contagens-detalhes.component.html',
  styleUrls: ['./contagens-detalhes.component.css'],
})
export class ContagensDetalhesComponent implements OnInit {
  contagem: Contagem = {};
  displayedColumns = ['nome', 'tipo', 'td', 'tr', 'complexidade', 'pf', 'acao'];
  displayedFooterColumns = ['pf'];
  subTotalPf = 0;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private funcaoDadosServico: FuncaoDadosService,
    private contagemService: ContagensService,
    private msgService: MessageService,
    private transacaoService: TransacaoService
  ) { }

  ngOnInit(): void {
    this.updateTableData();
  }

  pfSubtotalAL(){
    this.subTotalPf = 0;
    if(this.contagem && this.contagem.itens) this.contagem.itens.forEach(fd => {
      if(fd.dtype == TipoItemContagemEnum.FuncaoDados) this.subTotalPf += fd.pf;
    });
  }

  updateTableData() {
    this.route.params.subscribe((params) => {
      if (+params['contagemId']) {
        this.contagemService
          .ver(+params['contagemId'])
          .subscribe((contagem) => {
            contagem.totalPf = 0;
            contagem.itens.forEach(funcaoDados => {
              contagem.totalPf += funcaoDados.pf;
            });
            this.contagem = contagem;
            this.pfSubtotalAL();
          });
      }
    });
  }

  novoEditar(dados: FuncaoDados) {
    if (!dados) dados = new FuncaoDados({ tabelas: [] });
    dados.contagem = { id: this.contagem.id };
    const dialogRef = this.dialog.open(ContagensFuncaoDadosComponent, {
      width: '600px',
      data: { funcaoDados: dados }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) this.salvar(result);
    });
  }

  novoEditarTransacao(transacao: Transacao) {
    if (!transacao) transacao = new Transacao({ transacoesTD: [] });
    transacao.contagem =  { id: this.contagem.id };
    this.dialog.open(ContagensTransacoesComponent, {
      width: '600px',
      data: { transacao: transacao }
    });
  }

  gerenciadorMensagensTelas(){
    this.dialog.open(ContagensMensagensTelasComponent, {
      width: '600px'
    });
  }

  gerenciadorGrupo() {
    let grupo = new GrupoTransacao({ contagem: {id: this.contagem.id} });
    this.dialog.open(ContagensGrupoTransacoesComponent, {
      width: '600px',
      data: { grupo: grupo }
    });
  }


  salvar(arquivo: FuncaoDados) {
    arquivo.contagem = new Contagem({id: this.contagem.id});
    if (arquivo.id == undefined) {
      this.funcaoDadosServico.novo(arquivo).subscribe(
        (response) => {
          console.log("Response novo objeto ContagemItem", response);
          this.updateTableData();
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log("Erro novo objeto ContagemItem", error);
        }
      );
    } else {
      this.funcaoDadosServico.editar(arquivo).subscribe(
        (response: FuncaoDados) => {
          console.log("Response editar objeto ContagemItem", response);
          this.updateTableData();
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log("Erro editar objeto ContagemItem", error);
        }
      );
    }
  }


  apagar(arquivoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.funcaoDadosServico.apagar(arquivoId).subscribe(
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

  apagarTransacao(transacaoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.transacaoService.apagar(transacaoId).subscribe(
      (msg) => {
        this.updateTableData();
        this.msgService.success('Registro apagado com sucesso.');
      },
      (erro) => {
        console.log("Erro ao apagar transacao", erro)
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }

  // ver(sprint: Sprint){
  //   this.router.navigate(['/contagens/' + sprint.id]);
  // }
}
