import { TransacaoTDService } from "./../transacao-td.service";
import { ContagemItemService } from "./../../../contagem-item.service";
import { ArquivoReferenciado } from "./../../arquivo-referenciado/arquivo-referenciado";
import { Component, Inject, OnInit } from "@angular/core";
import {
  ComplexidadeEnum,
  ContagemItem,
  FuncoesTransacao,
  SubtipoItemContagemEnum,
  TipoContagemItemEnum,
} from "../../../contagem-item";
import { Coluna, Tabela } from "../../arquivo-referenciado/tabela";
import { Transacao } from "../transacao";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "pje-componentes";
import { Contagem } from "../../../../contagem/contagem";
import { Grupo } from "../grupo/grupo";
import { MensagemTela } from "../mensagem-tela/mensagem-tela";
import { GrupoService } from "../grupo/grupo.service";
import { MensagemTelaService } from "../mensagem-tela/mensagem-tela.service";
import { TipoTransacaoTDEnum, TransacaoTD } from "../transacao-td";

@Component({
  selector: "app-transacao-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class TransacaoCadastroComponent implements OnInit {
  contagemItem: Transacao;
  subtipos: string[] = FuncoesTransacao;
  grupos: Grupo[];
  msgsTela: MensagemTela[] = [];
  selectedMsgsTela: MensagemTela[] = [];
  selectedTabelasColunas: Coluna[];
  selectedARIndex = 0;
  selectedTRIndex = 0;
  arquivosReferenciados: ArquivoReferenciado[] = [];
  tdsToDelete: TransacaoTD[] = [];

  constructor(
    public dialogRef: MatDialogRef<TransacaoCadastroComponent>,
    private grupoService: GrupoService,
    private msgService: MessageService,
    private msgTelasService: MensagemTelaService,
    private contagemItemService: ContagemItemService,
    private transacaoTDService: TransacaoTDService,
    @Inject(MAT_DIALOG_DATA) public data: { transacao: Transacao }
  ) {
    this.contagemItem = data.transacao;
    this.contagemItem.contagem = { id: data.transacao.contagem.id };
  }

  ngOnInit(): void {
    this.grupoService
      .listar(new Grupo({ contagem: this.contagemItem.contagem }))
      .subscribe(
        (response) => {
          this.grupos = response;
        },
        (error) => {
          console.log("Erro ao recuperar lista de grupos", error);
        }
      );
    this.msgTelasService.listar({}).subscribe(
      (response) => {
        this.msgsTela = response.map(m => m = { id:m.id, nome: m.nome, isChecked:false });
        this.contagemItem.transacaoTDs.forEach((td) => {
          if (td.tipo == TipoTransacaoTDEnum.MENSAGEM_TELA) {
            this.selectedMsgsTela.push(this.msgsTela.find(
              (el) => el.id == td.mensagemTela.id
            ));
          }
        });
      },
      (error) => {
        console.log("Erro ao recuperar lista de mensagens", error);
      }
    );
    this.contagemItemService
      .listar({
        contagem: new Contagem({ id: this.contagemItem.contagem.id }),
        tipo: TipoContagemItemEnum.ARQUIVO_REFERENCIADO,
      })
      .subscribe(
        (response) => {
          this.arquivosReferenciados = <ArquivoReferenciado[]>response;
          this.contagemItem.transacaoTDs.forEach((tdCol) => {
            this.arquivosReferenciados.forEach((f) => {
              f.tabelas.forEach((t) => {
                t.colunas.forEach((c) => {
                  if (
                    tdCol.tipo == TipoTransacaoTDEnum.ARQUIVO_REFERENCIADO &&
                    c.id == tdCol.coluna.id
                  ) {
                    c.isChecked = true;
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
    let booleano = arquivoReferenciado.isChecked;
    arquivoReferenciado.tabelas.forEach((t) => {
      t.isChecked = booleano;
      t.colunas.forEach((c) => {
        c.isChecked = booleano;
      });
    });
    this.atualizaCheckBoxInterface();
  }

  checkTabelasValue(tab: Tabela) {
    let booleano = tab.isChecked;
    this.arquivosReferenciados.forEach((f) => {
      let fdChecked = false;
      f.tabelas.forEach((t) => {
        if (t.id == tab.id) {
          t.colunas.forEach((c) => {
            c.isChecked = booleano;
          });
        }
        if (t.isChecked) {
          fdChecked = true;
        }
      });
      f.isChecked = fdChecked;
    });
    this.atualizaCheckBoxInterface();
  }

  atualizaCheckBoxInterface() {
    this.arquivosReferenciados.forEach((f) => {
      let fdChecked = false;
      f.tabelas.forEach((t) => {
        let tabChecked = false;
        t.colunas.forEach((c) => {
          if (c.isChecked) {
            fdChecked = true;
            tabChecked = true;
          }
        });
        t.isChecked = tabChecked;
      });
      f.isChecked = fdChecked;
    });
  }

  salvar() {
    this.arquivosReferenciados.forEach(ar => {
      ar.tabelas.forEach(tb => {
        tb.colunas.forEach(col => {
          const currTd = this.contagemItem.transacaoTDs.find(transTD => transTD.tipo == TipoTransacaoTDEnum.ARQUIVO_REFERENCIADO
            && transTD.coluna.id == col.id);
          if(col.isChecked && !currTd) {
            this.contagemItem.transacaoTDs.push(new TransacaoTD({ tipo: TipoTransacaoTDEnum.ARQUIVO_REFERENCIADO, coluna: col }));
          }else if(!col.isChecked && currTd){
            const index = this.contagemItem.transacaoTDs.findIndex(c => c == currTd);
            if (index > -1) {
              this.tdsToDelete.push(this.contagemItem.transacaoTDs[index]);
              this.contagemItem.transacaoTDs.splice(index, 1);
            }
          }
        })
      })
    });
    this.msgsTela.forEach(msg => {
      if(this.selectedMsgsTela.includes(msg)){
        const currTd = this.contagemItem.transacaoTDs.find(transTD => transTD.tipo == TipoTransacaoTDEnum.MENSAGEM_TELA && transTD.mensagemTela.id == msg.id);
        if(!currTd){
          this.contagemItem.transacaoTDs.push(new TransacaoTD({tipo: TipoTransacaoTDEnum.MENSAGEM_TELA, mensagemTela: msg}));
        }
      }else {
        const index = this.contagemItem.transacaoTDs.findIndex(c => c.tipo == TipoTransacaoTDEnum.MENSAGEM_TELA && c.mensagemTela.id == msg.id);
            if (index > -1) {
              this.tdsToDelete.push(this.contagemItem.transacaoTDs[index]);
              this.contagemItem.transacaoTDs.splice(index, 1);
            }
      }
    });
    this.atualizaContagem();
    this.tdsToDelete.forEach(td => {
      this.transacaoTDService.apagar(td.id).subscribe(()=> {
        console.log("apagado td", td);
      }, error => {
        console.log("erro ao apagar td", error, td);
      });
    });
    this.contagemItemService.salvar(this.contagemItem).subscribe(
      (response) => {
        console.log(response);
        this.msgService.success("Registro salvo com sucesso.");
        this.dialogRef.close();
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar registro.");
        console.log("Erro ao salvar transação", error, this.contagemItem);
      }
    );
  }

  atualizaContagem() {
    this.contagemItem.td = 0;
    this.contagemItem.tr = 0;
    this.selectedMsgsTela.forEach(() => {
      this.contagemItem.td++;
    });
    this.arquivosReferenciados.forEach((ar) => {
      if (ar.isChecked) this.contagemItem.tr++;
      ar.tabelas.forEach((t) => {
        t.colunas.forEach((c) => {
          if (c.isChecked) this.contagemItem.td++;
        });
      });
    });
    this.analisaComplexidade();
    this.analisaPF();
  }

  analisaComplexidade() {
    if (this.contagemItem.subtipo == SubtipoItemContagemEnum.EE) {
      if (
        (this.contagemItem.td <= 15 && this.contagemItem.tr < 2) ||
        (this.contagemItem.td < 5 && this.contagemItem.tr == 2)
      ) {
        this.contagemItem.complexidade = ComplexidadeEnum.BAIXA;
      } else if (
        (this.contagemItem.td < 5 && this.contagemItem.tr > 2) ||
        (this.contagemItem.td <= 15 && this.contagemItem.tr == 2) ||
        (this.contagemItem.td > 15 && this.contagemItem.tr < 2)
      ) {
        this.contagemItem.complexidade = ComplexidadeEnum.MEDIA;
      } else {
        this.contagemItem.complexidade = ComplexidadeEnum.ALTA;
      }
    } else if (
      this.contagemItem.subtipo == SubtipoItemContagemEnum.CE ||
      this.contagemItem.subtipo == SubtipoItemContagemEnum.SE
    ) {
      if (
        (this.contagemItem.td <= 19 && this.contagemItem.tr < 2) ||
        (this.contagemItem.td < 6 && this.contagemItem.tr < 3)
      ) {
        this.contagemItem.complexidade = ComplexidadeEnum.BAIXA;
      } else if (
        (this.contagemItem.td < 6 && this.contagemItem.tr <= 3) ||
        (this.contagemItem.td <= 19 && this.contagemItem.tr <= 3) ||
        (this.contagemItem.td > 19 && this.contagemItem.tr < 2)
      ) {
        this.contagemItem.complexidade = ComplexidadeEnum.MEDIA;
      } else {
        this.contagemItem.complexidade = ComplexidadeEnum.ALTA;
      }
    }
  }
  analisaPF() {
    switch (this.contagemItem.subtipo) {
      case SubtipoItemContagemEnum.EE:
        switch (this.contagemItem.complexidade) {
          case ComplexidadeEnum.BAIXA:
            this.contagemItem.pf = 3;
            break;
          case ComplexidadeEnum.MEDIA:
            this.contagemItem.pf = 4;
            break;
          case ComplexidadeEnum.ALTA:
            this.contagemItem.pf = 6;
            break;
        }
        break;
      case SubtipoItemContagemEnum.CE:
        switch (this.contagemItem.complexidade) {
          case ComplexidadeEnum.BAIXA:
            this.contagemItem.pf = 3;
            break;
          case ComplexidadeEnum.MEDIA:
            this.contagemItem.pf = 4;
            break;
          case ComplexidadeEnum.ALTA:
            this.contagemItem.pf = 6;
            break;
        }
        break;
      case SubtipoItemContagemEnum.SE:
        switch (this.contagemItem.complexidade) {
          case ComplexidadeEnum.BAIXA:
            this.contagemItem.pf = 4;
            break;
          case ComplexidadeEnum.MEDIA:
            this.contagemItem.pf = 5;
            break;
          case ComplexidadeEnum.ALTA:
            this.contagemItem.pf = 7;
            break;
        }
        break;
    }
  }
}
