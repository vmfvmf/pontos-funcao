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
    if (data.arquivoReferenciado.id > 0) {
      this.tabelaService
        .listar({ contagemItem: <ContagemItem>this.arquivoReferenciado })
        .subscribe(
          (response) => {
            this.arquivoReferenciado.tabelas = response;
          },
          (error) => {
            console.log("erro ao recuperar tabelas", error);
            this.msgService.error("Erro ao recuperar tabelas.");
          }
        );
    }
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
    this.arquivoReferenciado.tabelas.push({ nome: this.novaTabela.nome });
    this.selectedTabelaIndex = this.arquivoReferenciado.tabelas.length;
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
    }
  }

  getSelectedTabelaIndex() {
    return this.selectedTabelaIndex ? this.selectedTabelaIndex : 0;
  }

  salvar() {
    this.contagemItemService.novo(this.arquivoReferenciado).subscribe(
      (response) => {
        this.arquivoReferenciado = response;
        this.msgService.success("Registro salvo com sucesso.");
        console.log("Response novo objeto ContagemItem", response);
        this.salvarTabelas();
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar!");
        console.log("Erro novo objeto ContagemItem", error);
      }
    );
  }

  salvarTabelas(){
    this.arquivoReferenciado.tabelas.forEach(tab => {
      this.tabelaService.save(tab).subscribe(response => {
        console.log("erserd");
      },error => {
        console.log("Erro ao salvar tabela.");
        console.log("Erro salvar tabela", error);
      })
    });
  }

  apagarTabela(tabela: Tabela) {
    this.tabelaService.apagar(tabela.id).subscribe(
      (response) => {
        this.msgService.success("Registro apagado com sucesso.");
        const index = this.arquivoReferenciado.tabelas.findIndex(
          (tb) => tb.id == tabela.id
        );
        if (index > -1) {
          this.arquivoReferenciado.tabelas.splice(index, 1);
        }
        this.atualizaContagem();
      },
      (erro) => {
        this.msgService.error("Ocorreu um erro ao apagar tabela.");
        console.log("erro ao apagar tabela", erro);
      }
    );
  }

  apagarColuna(coluna: Coluna) {
    this.colunaService.apagar(coluna.id).subscribe(
      (msg) => {
        this.msgService.success("Registro apagado com sucesso.");
        const index = this.arquivoReferenciado.tabelas[
          this.getSelectedTabelaIndex()
        ].colunas.findIndex((col) => col.id == coluna.id);
        if (index > -1) {
          this.arquivoReferenciado.tabelas[
            this.getSelectedTabelaIndex()
          ].colunas.splice(index, 1);
          this.atualizaContagem();
        }
        this.atualizaContagem();
      },
      (erro) => {
        this.msgService.error("Ocorreu um erro ao apagar coluna.");
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
    if (
      (this.arquivoReferenciado.td < 50 && this.arquivoReferenciado.tr == 1) ||
      (this.arquivoReferenciado.td < 20 && this.arquivoReferenciado.tr <= 5)
    ) {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.baixa;
    } else if (
      (this.arquivoReferenciado.td > 50 && this.arquivoReferenciado.tr == 1) ||
      (this.arquivoReferenciado.td >= 20 &&
        this.arquivoReferenciado.td <= 50 &&
        this.arquivoReferenciado.tr <= 5)
    ) {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.media;
    } else {
      this.arquivoReferenciado.complexidade = ComplexidadeEnum.alta;
    }
  }

  private calcularPF() {
    switch (this.arquivoReferenciado.subtipo) {
      case SubtipoItemContagemEnum.ALI:
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
      case SubtipoItemContagemEnum.AIE:
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
