
import { ArquivoReferenciado } from '../arquivo-referenciado';
import { Component, Inject,  OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coluna, Tabela } from '../tabela';
import { TabelaService } from '../tabela.service';
import { MessageService } from 'pje-componentes';
import { ColunaService } from '../coluna.service';
import { ArquivoReferenciadoService } from '../arquivo-referenciado.service';
import { FuncoesArquivoLogico, ComplexidadeEnum, SubTipoItemContagemEnum } from '../item-contagem';

@Component({
  selector: 'app-contagem-cadastro-arquivo-referenciado-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class ArquivoReferenciadoCadastroComponent implements OnInit {
  arquivoReferenciado: ArquivoReferenciado = new ArquivoReferenciado({});
  subtipos: string[] = FuncoesArquivoLogico;
  novaTabela: Tabela = new Tabela({ });
  novaColuna: Coluna = new Coluna({ });

  selectedTabelaIndex: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {arquivoReferenciado: ArquivoReferenciado},
    public dialogRef: MatDialogRef<ArquivoReferenciadoCadastroComponent>,
    private tabelaService: TabelaService,
    private msgService: MessageService,
    private colunaService: ColunaService,
    private arquivoReferenciadoService: ArquivoReferenciadoService
  ) {
    this.arquivoReferenciado = data.arquivoReferenciado;
  }

  ngOnInit(): void {
    this.atualizaContagem();
  }

  salvarArquivoReferenciado_SalvarTabela(){
    if(!this.arquivoReferenciado.id){
      if(!this.arquivoReferenciado.nome || this.arquivoReferenciado.nome.length < 1 ||
        !this.arquivoReferenciado.subtipo || this.arquivoReferenciado.subtipo.length < -1){
        this.msgService.error("Preencha o nome e o subtipo antes de adicionar tabelas.");
        return;
      }
      this.arquivoReferenciadoService.novo(this.arquivoReferenciado).subscribe(
        response => {
          this.arquivoReferenciado = response;
          this.salvarTabela();
        }, error => {
          console.log("Erro ao salvar arquivo referenciado", error, this.arquivoReferenciado);
        });
    }
    else if(this.novaTabela.nome.length > 0 && this.arquivoReferenciado.tabelas.findIndex(t => t.nome == this.novaTabela.nome) == -1){
      this.salvarTabela();
    }
  }

  salvarTabela(){
    const novo = new Tabela({nome: this.novaTabela.nome, arquivoReferenciado: new ArquivoReferenciado({ id: this.arquivoReferenciado.id }) });
    this.tabelaService.novo(novo)
    .subscribe(response => {
      this.arquivoReferenciado.tabelas.push(response);
      this.atualizaContagem();
    }, error => {
      console.log("Erro ao adicionar tabela", error);
    });
    this.novaTabela.nome = "";
  }

  adicionarColuna(){
    if(this.novaColuna.nome.length > 0 && this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()]
        .colunas.findIndex(c => c.nome == this.novaColuna.nome) == -1){
      this.adicionarNovaColuna();
    }
  }

  getSelectedTabelaIndex(){
    return this.selectedTabelaIndex ? this.selectedTabelaIndex : 0;
  }

  adicionarNovaColuna(){
    const nova = new Coluna({nome: this.novaColuna.nome, tabela: new Tabela({id: this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()].id})});
    this.colunaService.novo(nova)
    .subscribe(response => {
      this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()].colunas.push(response);
      this.atualizaContagem();
    }, error => {
      console.log("Erro ao adicionar coluna", error);
    });
    this.novaColuna.nome = "";
  }

  salvar(arquivo: ArquivoReferenciado) {
    if (arquivo.id == undefined) {
      this.arquivoReferenciadoService.novo(arquivo).subscribe(
        (response) => {
          this.msgService.success("Registro salvo com sucesso.");
          console.log("Response novo objeto ContagemItem", response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log("Erro novo objeto ContagemItem", error);
        }
      );
    } else {
      this.arquivoReferenciadoService.editar(arquivo).subscribe(
        (response: ArquivoReferenciado) => {
          this.msgService.success("Registro salvo com sucesso.");
          console.log("Response editar objeto ContagemItem", response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log("Erro editar objeto ContagemItem", error);
        }
      );
    }
  }

  apagarTabela(tabela: Tabela){
      this.tabelaService.apagar(tabela.id).subscribe(
      (response) => {
        this.msgService.success('Registro apagado com sucesso.');
        const index = this.arquivoReferenciado.tabelas.findIndex(tb => tb.id == tabela.id);
        if (index > -1) {
          this.arquivoReferenciado.tabelas.splice(index, 1);
        }
        this.atualizaContagem();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar tabela.');
        console.log("erro ao apagar tabela", erro);
      }
    );
  }

  apagarColuna(coluna: Coluna){
    this.colunaService.apagar(coluna.id).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        const index = this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()].colunas.findIndex(col => col.id == coluna.id);
        if (index > -1) {
          this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()].colunas.splice(index, 1);
          this.atualizaContagem();
        }
        this.atualizaContagem();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar coluna.');
        console.log("erro ao apagar coluna", erro);
      }
    );
  }

  atualizaContagem() {
    let i = 0;
    this.arquivoReferenciado.tabelas.forEach((t) => {
     t.colunas.forEach((c) => {
        i++;
      });
    });
    this.arquivoReferenciado.tr = this.arquivoReferenciado.tabelas.length;
    this.arquivoReferenciado.td = i;
    this.analisarComplexidade();
    this.calcularPF();
  }

  private analisarComplexidade() {
    if ((this.arquivoReferenciado.td < 50 && this.arquivoReferenciado.tr == 1) || (this.arquivoReferenciado.td < 20 && this.arquivoReferenciado.tr <= 5)) {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.baixa;
    } else if (
      (this.arquivoReferenciado.td > 50 && this.arquivoReferenciado.tr == 1) ||
      (this.arquivoReferenciado.td >= 20 && this.arquivoReferenciado.td <= 50 && this.arquivoReferenciado.tr <= 5)
    ) {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.media;
    } else {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.alta;
    }
  }

  private calcularPF() {
    switch (this.arquivoReferenciado.subtipo) {
      case SubTipoItemContagemEnum.ALI:
        switch (this.arquivoReferenciado.complexidade) {
          case ComplexidadeEnum.baixa:
            this.arquivoReferenciado.pf = 7;
            break;
          case ComplexidadeEnum.media:
            this.arquivoReferenciado.pf = 10;
            break;
          case ComplexidadeEnum.alta:
            this.arquivoReferenciado.pf = 15;
            break;
        }
        break;
      case SubTipoItemContagemEnum.AIE:
        switch (this.arquivoReferenciado.complexidade) {
          case ComplexidadeEnum.baixa:
            this.arquivoReferenciado.pf = 5;
            break;
          case ComplexidadeEnum.media:
            this.arquivoReferenciado.pf = 7;
            break;
          case ComplexidadeEnum.alta:
            this.arquivoReferenciado.pf = 10;
            break;
        }
    }
  }
}
