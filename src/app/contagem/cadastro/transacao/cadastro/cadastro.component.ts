import { TransacaoTDMensagemTelaService } from "./../transacao-td-mensagem-tela.service";
import { ArquivoReferenciadoService } from "./../../arquivo-referenciado/arquivo-referenciado.service";
import { ArquivoReferenciado } from "./../../arquivo-referenciado/arquivo-referenciado";
import { Component, Inject, OnInit } from "@angular/core";
import {
  ComplexidadeEnum,
  FuncoesTransacao,
  SubTipoItemContagemEnum,
} from "../../arquivo-referenciado/item-contagem";
import { Coluna, Tabela } from "../../arquivo-referenciado/tabela";
import { Transacao } from "../transacao";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "pje-componentes";
import { TransacaoService } from "../transacao.service";
import { Contagem } from "../../../../contagem/contagem";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { GrupoTransacao } from "../grupo/grupo-transacao";
import { MensagemTela } from "../mensagem-tela/mensagem-tela";
import { GrupoTransacaoService } from "../grupo/grupo_transacao.service";
import { MensagemTelaService } from "../mensagem-tela/mensagem-tela.service";
import { TransacaoTDColunaService } from "../transacao-td-coluna.service";
import { TransacaoTDColuna } from "../transacao-td-coluna";
import { TransacaoTDMensagemTela } from "../transacao-td-mensagem-tela";

@Component({
  selector: "app-transacao-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class TransacaoCadastroComponent implements OnInit {
  transacao: Transacao;
  subtipos: string[] = FuncoesTransacao;
  grupos: GrupoTransacao[];
  msgsTela: MensagemTela[] = [];
  selectedMsgsTela: MensagemTela[];
  selectedTabelasColunas: Coluna[];
  selectedARIndex = 0;
  selectedTRIndex = 0;
  arquivosReferenciados: ArquivoReferenciado[] = [];

  constructor(
    public dialogRef: MatDialogRef<TransacaoCadastroComponent>,
    private grupoService: GrupoTransacaoService,
    private msgService: MessageService,
    private msgTelasService: MensagemTelaService,
    private transacaoService: TransacaoService,
    private transacaoTdMsgTelaService: TransacaoTDMensagemTelaService,
    private arquivoReferenciadoService: ArquivoReferenciadoService,
    private transacaoTDColunaService: TransacaoTDColunaService,
    @Inject(MAT_DIALOG_DATA) public data: { transacao: Transacao }
  ) {
    this.transacao = data.transacao;
    this.transacao.contagem = { id: data.transacao.contagem.id };
    this.selectedMsgsTela = [];
  }

  ngOnInit(): void {
    this.grupoService.listar(new GrupoTransacao({contagem: this.transacao.contagem})).subscribe(
      (response) => {
        this.grupos = response;
      },
      (error) => {
        console.log("Erro ao recuperar lista de grupos", error);
      }
    );
    this.msgTelasService.listar(new MensagemTela({})).subscribe(
      (response) => {
        this.msgsTela = response;
        this.transacao.transacaosTDMensagemTela.forEach((td) => {
          this.selectedMsgsTela.push(
            this.msgsTela.find((el) => el.id == td.mensagemTela.id)
          );
        });
      },
      (error) => {
        console.log("Erro ao recuperar lista de mensagens", error);
      }
    );
    this.arquivoReferenciadoService
      .listar(
        new ArquivoReferenciado({
          contagem: new Contagem({ id: this.transacao.contagem.id }),
        })
      )
      .subscribe(
        (response) => {
          this.arquivosReferenciados = response;
          this.transacao.transacaosTDColunas.forEach((tdCol) => {
            this.arquivosReferenciados.forEach((f) => {
              f.tabelas.forEach((t) => {
                t.colunas.forEach((c) => {
                  if (c.id == tdCol.coluna.id) {
                    c.isCheckSelected = true;
                  }
                });
              });
            });
          });
          this.atualizaCheckBoxInterface();
        },
        (error) => {
          console.log(
            "Erro ao recuperar lista de arquivos referenciados",
            error
          );
        }
      );
  }

  checkFuncaoDadosValue(arquivoReferenciado: ArquivoReferenciado) {
    let booleano = arquivoReferenciado.isCheckSelected;
    arquivoReferenciado.tabelas.forEach((t) => {
      t.isCheckSelected = booleano;
      t.colunas.forEach((c) => {
        c.isCheckSelected = booleano;
      });
    });
    this.atualizaContagem();
  }

  checkTabelasValue(tab: Tabela) {
    let booleano = tab.isCheckSelected;
    this.arquivosReferenciados.forEach((f) => {
      let fdChecked = false;
      f.tabelas.forEach((t) => {
        if (t.id == tab.id) {
          t.colunas.forEach((c) => {
            c.isCheckSelected = booleano;
          });
        }
        if (t.isCheckSelected) {
          fdChecked = true;
        }
      });
      f.isCheckSelected = fdChecked;
    });
    this.atualizaContagem();
  }

  checkColunasValue(col: Coluna) {
    let ttdCol = this.transacao.transacaosTDColunas.find(
      (td) => td.coluna.id == col.id
    );
    if (col.isCheckSelected && !ttdCol) {
      let ttdCol = new TransacaoTDColuna({
        transacao: new Transacao({ id: this.transacao.id }),
        coluna: col,
      });
      this.transacaoTDColunaService.novo(ttdCol).subscribe(
        (response) => {
          console.log("Transação td coluna salva", response);
          this.transacao.transacaosTDColunas.push(response);
        },
        (error) => {
          this.msgService.success("Ocorreu um erro ao salvar registro.");
          console.log("Erro ao salvar transação td coluna", error, ttdCol);
        }
      );
    } else if (ttdCol) {
      this.transacaoTDColunaService.apagar(ttdCol.id).subscribe(
        (response) => {
          console.log("Apagado transação td coluna", ttdCol);
          const index = this.transacao.transacaosTDColunas.findIndex(
            (e) => e.id == ttdCol.id
          );
          if (index > -1) {
            this.transacao.transacaosTDColunas.splice(index, 1);
          }
        },
        (error) => {
          this.msgService.error("Ocorreu um erro ao apagar registro.");
          console.log("Erro ao apagar transação td coluna", error, ttdCol);
        }
      );
    }
    this.atualizaCheckBoxInterface();
  }

  atualizaCheckBoxInterface() {
    this.arquivosReferenciados.forEach((f) => {
      let fdChecked = false;
      f.tabelas.forEach((t) => {
        let tabChecked = false;
        t.colunas.forEach((c) => {
          if (c.isCheckSelected) {
            fdChecked = true;
            tabChecked = true;
          }
        });
        t.isCheckSelected = tabChecked;
      });
      f.isCheckSelected = fdChecked;
    });
    this.atualizaContagem();
  }

  onTabARChanged(evt: MatTabChangeEvent) {
    console.log(evt);
  }

  checkMsgTelaValue(selecionadosTela: MensagemTela[]) {
    if (!this.transacao.id) {
      this.transacaoService.novo(this.transacao).subscribe(
        (response) => {
          this.transacao.id = response.id;
          this.msgService.success("Registro salvo com sucesso.");
          this.salvaChecksMsgTelaSelecionados(selecionadosTela);
        },
        (error) => {
          this.msgService.error("Ocorreu um erro ao salvar registro.");
          console.log("Erro ao criar nova transação", error, this.transacao);
        }
      );
    } else {
      this.salvaChecksMsgTelaSelecionados(selecionadosTela);
    }
  }

  salvaChecksMsgTelaSelecionados(selecionadosTela: MensagemTela[]) {
    this.transacaoTdMsgTelaService
      .apagarTDMsgTelaEmLote(this.transacao.id)
      .subscribe(
        () => {
          let transacaosTD = selecionadosTela.map((m) => {
            return new TransacaoTDMensagemTela({
              transacao: new Transacao({ id: this.transacao.id }),
              mensagemTela: new MensagemTela({ id: m.id }),
            });
          });
          this.transacaoTdMsgTelaService
            .salvaMsgTelaEmLote(transacaosTD)
            .subscribe(
              (response2) => {
                console.log("salvando transTD", response2, transacaosTD);
                this.atualizaContagem();
              },
              (error2) => {
                console.log(
                  "Erro ao criar transação td em lote",
                  error2,
                  selecionadosTela
                );
              }
            );
        },
        (error) => {
          console.log(
            "Erro ao deletar transação td com transação id",
            error,
            this.transacao.id
          );
        }
      );
  }

  salvar() {
    this.transacaoService.novo(this.transacao).subscribe(
      (response) => {
        console.log(response);
        this.msgService.success("Registro salvo com sucesso.");
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar registro.");
        console.log("Erro ao criar nova transação", error, this.transacao);
      }
    );
  }

  atualizaContagem() {
    this.transacao.td = 0;
    this.transacao.tr = 0;
    this.transacao.td += this.selectedMsgsTela.length;
    this.arquivosReferenciados.forEach((f) => {
      if (f.isCheckSelected) this.transacao.tr++;
      f.tabelas.forEach((t) => {
        t.colunas.forEach((c) => {
          if (c.isCheckSelected) this.transacao.td++;
        });
      });
    });
    this.analisaComplexidade();
    this.analisaPF();
    if (this.transacao.id) {
      /** Todo: arrumar pq n funciona */
      let t = new Transacao({
        id: this.transacao.id,
        nome: this.transacao.nome, // grupo: this.transacao.grupo,
        td: this.transacao.td,
        tr: this.transacao.tr,
        pf: this.transacao.pf,
        contagem: this.transacao.contagem,
        complexidade: this.transacao.complexidade,
        subtipo: this.transacao.subtipo,
      });
      this.transacaoService.editar(t).subscribe((fd) => {
        this.transacao = fd;
        console.log("Atualização", fd);
      });
    }
  }
  analisaComplexidade() {
    if (this.transacao.subtipo == SubTipoItemContagemEnum.EE) {
      if (
        (this.transacao.td <= 15 && this.transacao.tr < 2) ||
        (this.transacao.td < 5 && this.transacao.tr == 2)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.baixa;
      } else if (
        (this.transacao.td < 5 && this.transacao.tr > 2) ||
        (this.transacao.td <= 15 && this.transacao.tr == 2) ||
        (this.transacao.td > 15 && this.transacao.tr < 2)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.media;
      } else {
        this.transacao.complexidade = ComplexidadeEnum.alta;
      }
    } else if (
      this.transacao.subtipo == SubTipoItemContagemEnum.CE ||
      this.transacao.subtipo == SubTipoItemContagemEnum.SE
    ) {
      if (
        (this.transacao.td <= 19 && this.transacao.tr < 2) ||
        (this.transacao.td < 6 && this.transacao.tr < 3)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.baixa;
      } else if (
        (this.transacao.td < 6 && this.transacao.tr <= 3) ||
        (this.transacao.td <= 19 && this.transacao.tr <= 3) ||
        (this.transacao.td > 19 && this.transacao.tr < 2)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.media;
      } else {
        this.transacao.complexidade = ComplexidadeEnum.alta;
      }
    }
  }
  analisaPF() {
    switch (this.transacao.subtipo) {
      case SubTipoItemContagemEnum.EE:
        switch (this.transacao.complexidade) {
          case ComplexidadeEnum.baixa:
            this.transacao.pf = 3;
            break;
          case ComplexidadeEnum.media:
            this.transacao.pf = 4;
            break;
          case ComplexidadeEnum.alta:
            this.transacao.pf = 6;
            break;
        }
        break;
      case SubTipoItemContagemEnum.CE:
        switch (this.transacao.complexidade) {
          case ComplexidadeEnum.baixa:
            this.transacao.pf = 3;
            break;
          case ComplexidadeEnum.media:
            this.transacao.pf = 4;
            break;
          case ComplexidadeEnum.alta:
            this.transacao.pf = 6;
            break;
        }
        break;
      case SubTipoItemContagemEnum.SE:
        switch (this.transacao.complexidade) {
          case ComplexidadeEnum.baixa:
            this.transacao.pf = 4;
            break;
          case ComplexidadeEnum.media:
            this.transacao.pf = 5;
            break;
          case ComplexidadeEnum.alta:
            this.transacao.pf = 7;
            break;
        }
        break;
    }
  }
}
