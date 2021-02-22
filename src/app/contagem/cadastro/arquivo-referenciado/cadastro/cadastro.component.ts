import { ContagemItemService } from "./../../../contagem-item.service";

import { ArquivoReferenciado } from "../arquivo-referenciado";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Coluna, Tabela } from "../tabela";
import { TabelaService } from "../tabela.service";
import { MessageService } from "pje-componentes";
import { ColunaService } from "../coluna.service";
import {
  FuncoesArquivoREFERENCIADO,
  ComplexidadeEnum,
  SubtipoItemContagemEnum,
  ContagemItem,
} from "../../../contagem-item";

@Component({
  selector: "app-contagem-cadastro-arquivo-referenciado-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class ArquivoReferenciadoCadastroComponent implements OnInit {
  arquivoReferenciado: ArquivoReferenciado = new ArquivoReferenciado({});
  subtipos: string[] = FuncoesArquivoREFERENCIADO;
  novaTabela: Tabela = new Tabela({});
  novaColuna: Coluna = new Coluna({});
  tabelasExcluir: Tabela[] = [];
  colunasExcluir: Coluna[] = [];
  selectedTabelaIndex: number;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { arquivoReferenciado: ArquivoReferenciado },
    public dialogRef: MatDialogRef<ArquivoReferenciadoCadastroComponent>,
    private tabelaService: TabelaService,
    private msgService: MessageService,
    private colunaService: ColunaService,
    private contagemItemService: ContagemItemService
  ) {
    this.arquivoReferenciado = data.arquivoReferenciado;
  }

  ngOnInit(): void {
    this.atualizaContagem();
  }

  incluirTabela() {
    if (
      !this.arquivoReferenciado.nome ||
      this.arquivoReferenciado.nome.length < 1 ||
      !this.arquivoReferenciado.subtipo ||
      this.arquivoReferenciado.subtipo.length < -1
    ) {
      this.msgService.error(
        "Preencha o nome e o subtipo antes de adicionar tabelas."
      );
      return;
    }
    this.arquivoReferenciado.tabelas.push({ nome: this.novaTabela.nome, colunas: [] });
    this.selectedTabelaIndex = this.arquivoReferenciado.tabelas.length;
    this.novaTabela.nome = "";
  }

  adicionarColuna() {
    if (
      this.novaColuna.nome.length > 0 &&
      this.arquivoReferenciado.tabelas[
        this.getSelectedTabelaIndex()
      ].colunas.findIndex((c) => c.nome == this.novaColuna.nome) == -1
    ) {
      this.arquivoReferenciado.tabelas[this.selectedTabelaIndex].colunas.push({
        nome: this.novaColuna.nome,
      });
      this.novaColuna.nome = "";
    }
  }

  getSelectedTabelaIndex() {
    return this.selectedTabelaIndex ? this.selectedTabelaIndex : 0;
  }

  salvar() {
    this.tabelasExcluir.forEach(t => this.tabelaService.apagar(t.id).subscribe(response => {
      console.log("Tabela apagada", t);
    }, error => {
      console.log("Erro apagar tabela", error);
    }));
    this.colunasExcluir.forEach(c => this.colunaService.apagar(c.id).subscribe(response => {
      console.log("Coluna apagada", c);
    }, error => {
      console.log("Erro apagar coluna", error);
    }));
    this.atualizaContagem();
    this.contagemItemService.salvar(this.arquivoReferenciado).subscribe(
      (response) => {
        this.arquivoReferenciado = response;
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
    const index = this.arquivoReferenciado.tabelas.findIndex(t => t.nome =tabela.nome);
    if (index > -1) {
      if(tabela.id) this.tabelasExcluir.push(tabela);
      this.arquivoReferenciado.tabelas.splice(index, 1);
    }
  }

  apagarColuna(coluna: Coluna) {
    const index = this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()].colunas.findIndex(c => c.nome = coluna.nome);
    if (index > -1) {
      if(coluna.id) this.colunasExcluir.push(coluna);
      this.arquivoReferenciado.tabelas[this.getSelectedTabelaIndex()].colunas.splice(index, 1);
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
    switch (this.arquivoReferenciado.subtipo) {
      case SubtipoItemContagemEnum.ALI:
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
      case SubtipoItemContagemEnum.AIE:
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
