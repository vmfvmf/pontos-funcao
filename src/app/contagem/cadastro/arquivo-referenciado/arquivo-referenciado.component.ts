import { ContagemItemService } from './../../contagem-item.service';
import { ContagemService } from './../../contagem.service';
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Contagem } from "../../contagem";
import { MessageService } from 'pje-componentes';
import { ArquivoReferenciado } from './arquivo-referenciado';
import { ArquivoReferenciadoCadastroComponent } from './cadastro/cadastro.component';
import { TipoContagemItemEnum } from '../../contagem-item';

@Component({
  selector: 'app-contagem-cadastro-arquivo-referenciado',
  templateUrl: './arquivo-referenciado.component.html',
  styleUrls: ['./arquivo-referenciado.component.scss'],
})
export class ArquivoReferenciadoComponent implements OnInit {
  @Input()
  contagem: Contagem;
  arquivosReferenciados: ArquivoReferenciado[] = [];
  subTotalPf = 0;
  constructor(
    public dialog: MatDialog,
    private arquivoReferenciadoService: ContagemItemService,
    private contagemService: ContagemService,
    private msgService: MessageService
    // private transacaoService: TransacaoService
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
    this.arquivoReferenciadoService.listar({contagem: this.contagem, tipo: TipoContagemItemEnum.ARQUIVO_REFERENCIADO}).subscribe(response => {
      this.arquivosReferenciados = response.map(m => new ArquivoReferenciado(m));
      console.log('recuperados arquivos referenciados', response);
    }, error => {
      console.log('erro ao recuperar arquivos referenciados', error);
      this.msgService.error("Ocorreu um erro ao recuperar arquivos referenciados.");
    });
  }

  novoEditar(dados: ArquivoReferenciado) {
    if (!dados) dados = new ArquivoReferenciado({ contagem: this.contagem });
    const dialogRef = this.dialog.open(ArquivoReferenciadoCadastroComponent, {
      width: '600px',
      data: { arquivoReferenciado: dados }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.updateTableData();
    });
  }

  // novoEditarTransacao(transacao: Transacao) {
  //   if (!transacao) transacao = new Transacao({ transacaosTDMensagemTela: [] });
  //   transacao.contagem =  { id: this.contagem.id };
  //   const dialogRef = this.dialog.open(ContagensTransacoesComponent, {
  //     width: '600px',
  //     data: { transacao: transacao }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.updateTableData();
  //   });
  // }

  gerenciadorMensagensTelas(){
    // this.dialog.open(ContagensMensagensTelasComponent, {
    //   width: '600px'
    // });
  }

  gerenciadorGrupo() {
    // let grupo = new GrupoTransacao({ contagem: {id: this.contagem.id} });
    // this.dialog.open(ContagensGrupoTransacoesComponent, {
    //   width: '600px',
    //   data: { grupo: grupo }
    // });
  }


  apagar(arquivoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.arquivoReferenciadoService.apagar(arquivoId).subscribe(
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
    // if (confirm('Confirmar. Apagar o registro?') != true) {
    //   return;
    // }
    // this.transacaoService.apagar(transacaoId).subscribe(
    //   (msg) => {
    //     this.updateTableData();
    //     this.msgService.success('Registro apagado com sucesso.');
    //   },
    //   (erro) => {
    //     console.log("Erro ao apagar transacao", erro)
    //     this.msgService.error('Ocorreu um erro ao apagar registro.');
    //   }
    // );
  }

}
