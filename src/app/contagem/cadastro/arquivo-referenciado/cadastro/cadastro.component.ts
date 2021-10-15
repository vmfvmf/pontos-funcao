import { ArquivoReferenciadoService } from './../arquivo-referenciado.service';
import { ArquivoReferenciado, FuncaoArquivoReferenciadoEnum } from "../arquivo-referenciado";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Tabela } from "../tabela";
import {
  FuncoesArquivoREFERENCIADO,
  ComplexidadeEnum
} from "../../../abstract-contagem-item";
import { MessageService } from '../../../../shared/Service/message.service';
import { NgForm } from '@angular/forms';
import { Coluna } from '../coluna';

@Component({
  selector: "app-contagem-cadastro-arquivo-referenciado-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class ArquivoReferenciadoCadastroComponent implements OnInit {
  arquivoReferenciado: ArquivoReferenciado = new ArquivoReferenciado();
  funcoes: string[] = FuncoesArquivoREFERENCIADO;
  novaTabela: Tabela = new Tabela();
  novaColuna: Coluna = new Coluna();
  tabelasExcluir: Tabela[] = [];
  colunasExcluir: Coluna[] = [];
  selectedTabelaIndex: number = 0;
  somenteLeitura = false;
  @ViewChild('f') public form: NgForm;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { arquivoReferenciado: ArquivoReferenciado, somenteLeitura: boolean },
    public dialogRef: MatDialogRef<ArquivoReferenciadoCadastroComponent>,
    private msgService: MessageService
  ) {
    this.arquivoReferenciado = data.arquivoReferenciado;
    this.somenteLeitura = data.somenteLeitura;
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
        "Preencha o nome, função e tabela antes de adicionar tabela."
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
      ].colunas.push(new Coluna(this.novaColuna.nome));
      this.novaColuna.nome = "";
    }
  }

  apagarTabela(tabela: Tabela) {
    const i = this.arquivoReferenciado.tabelas.findIndex(tab => tab.id === tabela.id);
    this.arquivoReferenciado.tabelas.splice(i, 1);
  }

  apagarColuna(dados: {tabela: Tabela, coluna: Coluna}) {
    const i = dados.tabela.colunas.findIndex(col => col.id === dados.coluna.id);
    dados.tabela.colunas.splice(i, 1);
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }
    if (!this.arquivoReferenciado.tabelas[0]) {
      this.msgService.error("Adicione uma tabela e uma coluna para salvar.");
      return;
    }
    if (this.arquivoReferenciado.tabelas.find(tab => !tab.colunas[0])) {
      this.msgService.error("Não são permitidas tabelas sem colunas, adicione colunas para todas tabelas ou exclua as tabelas sem colunas.");
      return;
    }
    this.atualizaContagem();
    this.dialogRef.close(this.arquivoReferenciado);
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
