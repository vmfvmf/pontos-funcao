import { ColunasService } from './../../../tabelas/colunas.service';
import { MessageService } from './../../../shared/message-service';
import { TabelasService } from './../../../tabelas/tabelas.service';
import { Tabela, Coluna } from './../../../tabelas/tabela';
import { FuncaoDados } from './funcao-dados';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncoesArquivoLogico } from '../../item-contagem';

@Component({
  selector: 'app-contagens-funcao-dados',
  templateUrl: './contagens-funcao-dados.component.html',
  styleUrls: ['./contagens-funcao-dados.component.css']
})
export class ContagensFuncaoDadosComponent implements OnInit {
  funcaoDados: FuncaoDados;
  subtipos: string[] = FuncoesArquivoLogico;
  trTotal = 0;
  tdTotal = 0;

  novoTr: Tabela = new Tabela({});
  novoTd: Coluna = {nome: ""};
  selectedTrIndex: number;
  constructor(
    public dialogRef: MatDialogRef<ContagensFuncaoDadosComponent>,
    private tabelaService: TabelasService,
    private msgService: MessageService,
    private colunaService: ColunasService,
    @Inject(MAT_DIALOG_DATA) public data: {funcaoDados: FuncaoDados}) {
      this.funcaoDados = data.funcaoDados;
    }

  ngOnInit(): void {
    this.atualizaContagemTDs();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onOkClick(){
  }

  teste(){
    if(this.novoTr.nome.length > 0){
      this.funcaoDados.tabelas.push(new Tabela({nome: this.novoTr.nome, colunas: []}));
      this.novoTr.nome = "";
      this.atualizaContagemTDs();
    }
  }

  atualizaContagemTDs(){
    let i = 0;
    this.funcaoDados.tabelas.forEach( t => {
      t.colunas.forEach( c => {
        i++;
      });
    });
    this.trTotal = this.funcaoDados.tabelas.length;
    this.tdTotal = i;
  }

  teste2(){
    if(this.novoTd.nome.length > 0){
      this.funcaoDados.tabelas[this.selectedTrIndex?this.selectedTrIndex:0].colunas.push({nome: this.novoTd.nome});
      this.novoTd = {nome: ""};
      this.atualizaContagemTDs();
    }
  }
  apagarTabela(tr: Tabela){
      if (confirm('Confirmar? Apagar tabela e suas colunas?') != true) {
        return;
      }
      if(tr.id){
        this.tabelaService.apagar(tr.id).subscribe(
        (msg) => {
          this.msgService.success('Registro apagado com sucesso.');
          window.location.reload();
          this.atualizaContagemTDs();
        },
        (erro) => {
          this.msgService.error('Ocorreu um erro ao apagar registro.');
        }
      );
      }else{
        const index = this.funcaoDados.tabelas.indexOf(tr, 0);
        if (index > -1) {
          this.funcaoDados.tabelas.splice(index, 1);
          this.atualizaContagemTDs();
        }
      }
  }

  apagarColuna(td: Coluna){
    if (confirm('Confirmar? Apagar coluna?') != true) {
      return;
    }
    if(td.id){
      this.colunaService.apagar(td.id).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        window.location.reload();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
    }else{
      const index = this.funcaoDados[this.selectedTrIndex].colunas.indexOf(td, 0);
      if (index > -1) {
        this.funcaoDados[this.selectedTrIndex].colunas.splice(index, 1);
        this.atualizaContagemTDs();
      }
    }
}

}
