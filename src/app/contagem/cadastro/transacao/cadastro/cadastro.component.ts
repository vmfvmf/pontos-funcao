import { FuncaoTransacaoEnum } from './../../../abstract-contagem-item';
import { TransacaoTDService } from "./../transacao-td.service";
import { AbstractContagemItemService } from "./../../../contagem-item.service";
import { ArquivoReferenciado } from "./../../arquivo-referenciado/arquivo-referenciado";
import { Component, Inject, OnInit } from "@angular/core";
import {
  ComplexidadeEnum,
  FuncoesTransacao
} from "../../../abstract-contagem-item";
import { Coluna, Tabela } from "../../arquivo-referenciado/tabela";
import { Transacao } from "../transacao";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "pje-componentes";
import { Contagem } from "../../../../contagem/contagem";
import { Grupo } from "../grupo/grupo";
import { GrupoService } from "../grupo/grupo.service";
import { TipoTransacaoTDEnum, TransacaoTD } from "../transacao-td";

@Component({
  selector: "app-transacao-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class TransacaoCadastroComponent implements OnInit {
  contagemItem: Transacao;
  funcoes: string[] = FuncoesTransacao;
  grupos: Grupo[];
  selectedTabelasColunas: Coluna[];
  selectedARIndex = 0;
  selectedTRIndex = 0;
  arquivosReferenciados: ArquivoReferenciado[] = [];
  tdsToDelete: TransacaoTD[] = [];
  selectedMsgAcao: String[] = [];
  msgAcao: String[] = ['ACAO', 'MENSAGEM'];
  aberto = false;
  aberto2 = false;

  exp1(obj: boolean){
    this.aberto = obj;
  }
  exp2(obj: boolean){
    this.aberto2 = obj;
  }

  constructor(
    public dialogRef: MatDialogRef<TransacaoCadastroComponent>,
    private grupoService: GrupoService,
    private msgService: MessageService,
    private contagemItemService: AbstractContagemItemService,
    private transacaoTDService: TransacaoTDService,
    @Inject(MAT_DIALOG_DATA) public data: { transacao: Transacao }
  ) {
    this.contagemItem = data.transacao;
    this.contagemItem.contagem = { id: data.transacao.contagem.id };
  }

  ngOnInit(): void {
    const grupo = new Grupo();
    grupo.contagem = this.contagemItem.contagem;
    this.grupoService
      .listar(grupo)
      .subscribe(
        (response) => {
          this.grupos = response;
        },
        (error) => {
          console.log("Erro ao recuperar lista de grupos", error);
        }
      );
    const trans = new Transacao();
    trans.contagem =  this.contagemItem.contagem;
    this.contagemItemService
      .listar(trans)
      .subscribe(
        (response) => {
          this.arquivosReferenciados = <ArquivoReferenciado[]>response;
          this.contagemItem.transacaoTDs.forEach((tdCol) => {
            this.arquivosReferenciados.forEach((f) => {
              f.tabelas.forEach((t) => {
                t.colunas.forEach((c) => {
                  if (
                    tdCol.tipo == 'ARQUIVO_REFERENCIADO' &&
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
      this.msgAcao.forEach(msg => {
        if(this.contagemItem.transacaoTDs.find(td => td.tipo == msg)){
          this.selectedMsgAcao.push(msg);
        }
      });
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
          const currTd = this.contagemItem.transacaoTDs.find(transTD => transTD.coluna.id == col.id);
          if(col.isChecked && !currTd) {
            const trans = new TransacaoTD(this.contagemItem);
            trans.coluna = col;
            this.contagemItem.transacaoTDs.push(trans);
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
    this.selectedMsgAcao.forEach(() => {
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
    const transacao = this.contagemItem as Transacao;
    if (transacao.funcao === FuncaoTransacaoEnum.EE) {
      if (
        (transacao.td <= 15 && transacao.tr < 2) ||
        (transacao.td < 5 && transacao.tr == 2)
      ) {
        transacao.complexidade = ComplexidadeEnum.BAIXA;
      } else if (
        (transacao.td < 5 && transacao.tr > 2) ||
        (transacao.td <= 15 && transacao.tr == 2) ||
        (transacao.td > 15 && transacao.tr < 2)
      ) {
        transacao.complexidade = ComplexidadeEnum.MEDIA;
      } else {
        transacao.complexidade = ComplexidadeEnum.ALTA;
      }
    } else if (
      transacao.funcao == FuncaoTransacaoEnum.CE ||
      transacao.funcao == FuncaoTransacaoEnum.SE
    ) {
      if (
        (transacao.td <= 19 && transacao.tr < 2) ||
        (transacao.td < 6 && transacao.tr < 3)
      ) {
        transacao.complexidade = ComplexidadeEnum.BAIXA;
      } else if (
        (transacao.td < 6 && transacao.tr <= 3) ||
        (transacao.td <= 19 && transacao.tr <= 3) ||
        (transacao.td > 19 && transacao.tr < 2)
      ) {
        transacao.complexidade = ComplexidadeEnum.MEDIA;
      } else {
        transacao.complexidade = ComplexidadeEnum.ALTA;
      }
    }
  }

  analisaPF() {
    const transacao = this.contagemItem as Transacao;
    switch (transacao.funcao) {
      case FuncaoTransacaoEnum.EE:
        switch (transacao.complexidade) {
          case ComplexidadeEnum.BAIXA:
            transacao.pf = 3;
            break;
          case ComplexidadeEnum.MEDIA:
            transacao.pf = 4;
            break;
          case ComplexidadeEnum.ALTA:
            transacao.pf = 6;
            break;
        }
        break;
      case FuncaoTransacaoEnum.CE:
        switch (transacao.complexidade) {
          case ComplexidadeEnum.BAIXA:
            transacao.pf = 3;
            break;
          case ComplexidadeEnum.MEDIA:
            transacao.pf = 4;
            break;
          case ComplexidadeEnum.ALTA:
            transacao.pf = 6;
            break;
        }
        break;
      case FuncaoTransacaoEnum.SE:
        switch (transacao.complexidade) {
          case ComplexidadeEnum.BAIXA:
            transacao.pf = 4;
            break;
          case ComplexidadeEnum.MEDIA:
            transacao.pf = 5;
            break;
          case ComplexidadeEnum.ALTA:
            transacao.pf = 7;
            break;
        }
        break;
    }
  }
}
