import { AbstractContagemItemService } from "./../../../contagem-item.service";

import { ArquivoReferenciado, FuncaoArquivoReferenciadoEnum } from "../arquivo-referenciado";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Coluna, Tabela } from "../tabela";
import { MessageService } from "pje-componentes";
import {
  FuncoesArquivoREFERENCIADO,
  ComplexidadeEnum
} from "../../../abstract-contagem-item";

@Component({
  selector: "app-contagem-cadastro-arquivo-referenciado-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class ArquivoReferenciadoCadastroComponent implements OnInit {
  arquivoReferenciado: ArquivoReferenciado = new ArquivoReferenciado();
  funcoes: string[] = FuncoesArquivoREFERENCIADO;
  novaTabela: Tabela = new Tabela();
  novaColuna: Coluna = new Coluna({});
  tabelasExcluir: Tabela[] = [];
  colunasExcluir: Coluna[] = [];
  selectedTabelaIndex: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { arquivoReferenciado: ArquivoReferenciado },
    public dialogRef: MatDialogRef<ArquivoReferenciadoCadastroComponent>,
    private msgService: MessageService,
    private abstractContagemItemService: AbstractContagemItemService
  ) {
    this.arquivoReferenciado = data.arquivoReferenciado;
  }

  ngOnInit(): void {
    this.atualizaContagem();
  }

  incluirTabela() {
    if (
      !this.arquivoReferenciado.nome ||
      !this.arquivoReferenciado.funcao ||
      !this.novaTabela.nome
    ) {
      this.msgService.error(
        "Preencha o nome, subtipo e tabela antes de adicionar tabela."
      );
      return;
    }
    if (
      this.arquivoReferenciado.tabelas
        .map((t) => t.nome)
        .includes(this.novaTabela.nome)
    ) {
      this.msgService.error("Já  existe uma tabela com este nome");
      this.selectedTabelaIndex = this.arquivoReferenciado.tabelas.findIndex(
        (t) => t.nome === this.novaTabela.nome
      );
      this.novaTabela.nome = "";
      return;
    }
    const newTable = new Tabela(this.novaTabela.nome);
    this.arquivoReferenciado.tabelas.push(newTable);
    this.selectedTabelaIndex = this.arquivoReferenciado.tabelas.length;
    this.novaTabela.nome = "";
  }

  adicionarColuna() {
    if (
      this.novaColuna.nome.length > 0 &&
      this.arquivoReferenciado.tabelas[
        this.selectedTabelaIndex
      ].colunas.findIndex((c) => c.nome == this.novaColuna.nome) == -1
    ) {
      this.arquivoReferenciado.tabelas[
        this.selectedTabelaIndex
      ].colunas.push({
        nome: this.novaColuna.nome,
      });
      this.novaColuna.nome = "";
    }
  }

  salvar() {
    // forkJoin(this.tabelasExcluir.map(t => this.tabelaService.apagar(t.id)))
    // .subscribe( result => {
    //   if (result) {
    //     console.log("tabelas apagadas", result);
    //   }
    // });

    // forkJoin(this.colunasExcluir.map(c => this.colunaService.apagar(c.id)))
    // .subscribe( result => {
    //   if (result) {
    //     console.log("colunas apagadas", result);
    //   }
    // });

    this.atualizaContagem();

    this.abstractContagemItemService.salvar(this.arquivoReferenciado).subscribe(
      (response) => {
        this.arquivoReferenciado = response as ArquivoReferenciado;
        this.msgService.success("Registro salvo com sucesso.");
        console.log("Response novo objeto ContagemItem", response);
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar!");
        console.log("Erro novo objeto ContagemItem", error);
      }
    );
  }

  apagarTabela(tabela: Tabela) {
    const index = this.arquivoReferenciado.tabelas.findIndex(
      (t) => (t.nome === tabela.nome)
    );
    if (index > -1) {
      if (tabela.id) this.tabelasExcluir.push(tabela);
      this.arquivoReferenciado.tabelas.splice(index, 1);
    }
  }

  apagarColuna(coluna: Coluna) {
    const index = this.arquivoReferenciado.tabelas[
      this.selectedTabelaIndex
    ].colunas.findIndex((c) => (c.nome === coluna.nome));
    if (index > -1) {
      if (coluna.id) this.colunasExcluir.push(coluna);
      this.arquivoReferenciado.tabelas[
        this.selectedTabelaIndex
      ].colunas.splice(index, 1);
    }
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
    if (
      (this.arquivoReferenciado.td < 50 && this.arquivoReferenciado.tr == 1) ||
      (this.arquivoReferenciado.td < 20 && this.arquivoReferenciado.tr <= 5)
    ) {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.BAIXA;
    } else if (
      (this.arquivoReferenciado.td > 50 && this.arquivoReferenciado.tr == 1) ||
      (this.arquivoReferenciado.td >= 20 &&
        this.arquivoReferenciado.td <= 50 &&
        this.arquivoReferenciado.tr <= 5)
    ) {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.MEDIA;
    } else {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.ALTA;
    }
  }

  private calcularPF() {
    switch (this.arquivoReferenciado.funcao) {
      case FuncaoArquivoReferenciadoEnum.ALI:
        switch (this.arquivoReferenciado.complexidade) {
          case ComplexidadeEnum.BAIXA:
            this.arquivoReferenciado.pf = 7;
            break;
          case ComplexidadeEnum.MEDIA:
            this.arquivoReferenciado.pf = 10;
            break;
          case ComplexidadeEnum.ALTA:
            this.arquivoReferenciado.pf = 15;
            break;
        }
        break;
      case FuncaoArquivoReferenciadoEnum.AIE:
        switch (this.arquivoReferenciado.complexidade) {
          case ComplexidadeEnum.BAIXA:
            this.arquivoReferenciado.pf = 5;
            break;
          case ComplexidadeEnum.MEDIA:
            this.arquivoReferenciado.pf = 7;
            break;
          case ComplexidadeEnum.ALTA:
            this.arquivoReferenciado.pf = 10;
            break;
        }
    }
  }
}
