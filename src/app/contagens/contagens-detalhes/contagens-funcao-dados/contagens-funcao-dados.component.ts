import { ComplexidadeEnum, FuncoesArquivoLogico, FuncoesTransacao, SubTipoItemContagemEnum } from './../../item-contagem';
import { FuncaoDadosService } from './funcao-dados.service';
import { ColunasService } from '../../colunas.service';
import { MessageService } from './../../../shared/message-service';
import { TabelasService } from '../../tabelas.service';
import { Tabela, Coluna } from '../../tabela';
import { FuncaoDados } from './funcao-dados';
import { Component, Inject,  OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contagem } from '../../contagem';

@Component({
  selector: 'app-contagens-funcao-dados',
  templateUrl: './contagens-funcao-dados.component.html',
  styleUrls: ['./contagens-funcao-dados.component.css'],
})
export class ContagensFuncaoDadosComponent implements OnInit {
  funcaoDados: FuncaoDados;
  subtipos: string[] = FuncoesArquivoLogico;
  novaTabela: Tabela = new Tabela({ });
  novaColuna: Coluna = new Coluna({ });

  selectedTabelaIndex: number;
  constructor(
    public dialogRef: MatDialogRef<ContagensFuncaoDadosComponent>,
    private tabelaService: TabelasService,
    private msgService: MessageService,
    private colunaService: ColunasService,
    private funcaoDadosService: FuncaoDadosService,
    @Inject(MAT_DIALOG_DATA) public data: { funcaoDados: FuncaoDados }
  ) {
    this.funcaoDados = data.funcaoDados;
  }

  adicionarTabela(){
    if(!this.funcaoDados.id){
      // this.funcaoDados.contagem = new Contagem({ id: });
      if(!this.funcaoDados.nome || this.funcaoDados.nome.length < 1 || !this.funcaoDados.subtipo || this.funcaoDados.subtipo.length < -1){
        this.msgService.error("Preencha o nome e o subtipo antes de adicionar tabelas.")
        return;
      }
      this.funcaoDadosService.novo(this.funcaoDados).subscribe(
        response => {
          this.funcaoDados = response;
          this.adicionarNovaTabela();
        }, error => {
          console.log("Erro ao salvar função dados", error, this.funcaoDados);
        });
    }
    else if(this.novaTabela.nome.length > 0 && this.funcaoDados.tabelas.findIndex(t => t.nome == this.novaTabela.nome) == -1){
      this.adicionarNovaTabela();
    }
  }

  adicionarColuna(){
    if(this.novaColuna.nome.length > 0 && this.funcaoDados.tabelas[this.getSelectedTabelaIndex()]
        .colunas.findIndex(c => c.nome == this.novaColuna.nome) == -1){
      this.adicionarNovaColuna();
    }
  }

  getSelectedTabelaIndex(){
    return this.selectedTabelaIndex ? this.selectedTabelaIndex : 0;
  }

  adicionarNovaColuna(){
    const nova = new Coluna({nome: this.novaColuna.nome, tabela: new Tabela({id: this.funcaoDados.tabelas[this.getSelectedTabelaIndex()].id})});
    this.colunaService.novo(nova)
    .subscribe(response => {
      this.funcaoDados.tabelas[this.getSelectedTabelaIndex()].colunas.push(response);
      this.atualizaContagem();
    }, error => {
      console.log("Erro ao adicionar coluna", error);
    });
    this.novaColuna.nome = "";
  }

  adicionarNovaTabela(){
    const novo = new Tabela({nome: this.novaTabela.nome, funcaoDados: new FuncaoDados({id: this.funcaoDados.id}), colunas: []});
    this.tabelaService.novo(novo)
    .subscribe(response => {
      this.funcaoDados.tabelas.push(response);
      this.atualizaContagem();
    }, error => {
      console.log("Erro ao adicionar tabela", error);
    });
    this.novaTabela.nome = "";
  }



  ngOnInit(): void {
    this.atualizaContagem();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    this.atualizaContagem();
  }

  apagarTabela(tabela: Tabela){
      this.tabelaService.apagar(tabela.id).subscribe(
      (response) => {
        this.msgService.success('Registro apagado com sucesso.');
        const index = this.funcaoDados.tabelas.findIndex(tb => tb.id == tabela.id);
        if (index > -1) {
          this.funcaoDados.tabelas.splice(index, 1);
          this.atualizaContagem();
        }
        this.atualizaContagem();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar tabela.', erro);
      }
    );
  }

  apagarColuna(coluna: Coluna){
    this.colunaService.apagar(coluna.id).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        const index = this.funcaoDados.tabelas[this.getSelectedTabelaIndex()].colunas.findIndex(col => col.id == coluna.id);
        if (index > -1) {
          this.funcaoDados.tabelas[this.getSelectedTabelaIndex()].colunas.splice(index, 1);
          this.atualizaContagem();
        }
        this.atualizaContagem();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar coluna.', erro);
      }
    );
  }

  atualizaContagem() {
    let i = 0;
    this.funcaoDados.tabelas.forEach((t) => {
     t.colunas.forEach((c) => {
        i++;
      });
    });
    this.funcaoDados.tr = this.funcaoDados.tabelas.length;
    this.funcaoDados.td = i;
    this.analisaComplexidade();
    this.analisaPF();
  }
  analisaComplexidade() {
    if ((this.funcaoDados.td < 50 && this.funcaoDados.tr == 1) || (this.funcaoDados.td < 20 && this.funcaoDados.tr <= 5)) {
      this.funcaoDados.complexidade = ComplexidadeEnum.baixa;
    } else if (
      (this.funcaoDados.td > 50 && this.funcaoDados.tr == 1) ||
      (this.funcaoDados.td >= 20 && this.funcaoDados.td <= 50 && this.funcaoDados.tr <= 5)
    ) {
      this.funcaoDados.complexidade = ComplexidadeEnum.media;
    } else {
      this.funcaoDados.complexidade = ComplexidadeEnum.alta;
    }
  }
  analisaPF() {
    switch (this.funcaoDados.subtipo) {
      case SubTipoItemContagemEnum.ALI:
        switch (this.funcaoDados.complexidade) {
          case ComplexidadeEnum.baixa:
            this.funcaoDados.pf = 7;
            break;
          case ComplexidadeEnum.media:
            this.funcaoDados.pf = 10;
            break;
          case ComplexidadeEnum.alta:
            this.funcaoDados.pf = 15;
            break;
        }
        break;
      case SubTipoItemContagemEnum.AIE:
        switch (this.funcaoDados.complexidade) {
          case ComplexidadeEnum.baixa:
            this.funcaoDados.pf = 5;
            break;
          case ComplexidadeEnum.media:
            this.funcaoDados.pf = 7;
            break;
          case ComplexidadeEnum.alta:
            this.funcaoDados.pf = 10;
            break;
        }
    }
  }
}
