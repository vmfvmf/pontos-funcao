import { FuncaoTransacaoEnum } from "./../../../abstract-contagem-item";
import { TransacaoTDService } from "./../transacao-td.service";
import { ArquivoReferenciado } from "./../../arquivo-referenciado/arquivo-referenciado";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  ComplexidadeEnum,
  FuncoesTransacao,
} from "../../../abstract-contagem-item";
import { Tabela } from "../../arquivo-referenciado/tabela";
import { Coluna } from "../../arquivo-referenciado/coluna";
import { Transacao } from "../transacao";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Contagem } from "../../../../contagem/contagem";
import { Grupo } from "../grupo/grupo";
import { GrupoService } from "../grupo/grupo.service";
import { TransacaoTD } from "../transacao-td";
import { ArquivoReferenciadoService } from "../../arquivo-referenciado/arquivo-referenciado.service";
import { TransacaoService } from "../transacao.service";
import { MessageService } from "../../../../shared/Service/message.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-transacao-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class TransacaoCadastroComponent implements OnInit {
  transacao: Transacao;
  funcoes: string[] = FuncoesTransacao;
  grupos: Grupo[];
  selectedTabelasColunas: Coluna[];
  selectedARIndex = 0;
  selectedTRIndex = 0;
  contagem: Contagem;
  arquivosReferenciados: ArquivoReferenciado[] = [];
  somenteLeitura = true;

  @ViewChild('f') public form: NgForm;

  constructor(
    public dialogRef: MatDialogRef<TransacaoCadastroComponent>,
    private grupoService: GrupoService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      transacao: Transacao;
      contagem: Contagem;
      somenteLeitura: boolean;
    }
  ) {
    this.transacao = data.transacao;
    this.contagem = data.contagem;
    this.somenteLeitura = data.somenteLeitura;
    this.setArquivosReferenciados(data.contagem.arquivosReferenciados);
  }

  ngOnInit(): void {
    this.grupoService.listar(new Grupo(this.contagem)).subscribe(
      (response) => {
        this.grupos = response;
      },
      (error) => {
        console.log("Erro ao recuperar lista de grupos", error);
      }
    );
  }

  setArquivosReferenciados(arquivosReferenciados: ArquivoReferenciado[]) {
    arquivosReferenciados.forEach(element => {
      const ar = Object.assign(new ArquivoReferenciado(), element) as ArquivoReferenciado;
      ar.tabelas = [];
      element.tabelas.forEach(t => {
        const cols = [];
        const tab =  Object.assign(new Tabela(), t) as Tabela;
        t.colunas.forEach(c => cols.push(Object.assign(new Coluna(), c) as Coluna));
        tab.colunas = cols;
        ar.tabelas.push(tab);
      });
      this.arquivosReferenciados.push(ar);
    });
    this.transacao.transacaoTDs.forEach((tdCol) => {
      this.arquivosReferenciados.forEach((arquivo) => {
        arquivo.tabelas.forEach((t) => {
          t.colunas.forEach((c) => {
            if (c.id == tdCol.coluna.id) {
              c.isChecked = true;
            }
          });
        });
      });
    });
    this.atualizaCheckBoxInterface();
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
    if (this.form.invalid) {
      return;
    }
    this.arquivosReferenciados.forEach((ar) => {
      ar.tabelas.forEach((tb) => {
        tb.colunas.forEach((col) => {
          const currTd = this.transacao.transacaoTDs.find(
            (transTD) => transTD.coluna.id == col.id
          );
          if (col.isChecked && !currTd) {
            const transacaoId = new Transacao();
            transacaoId.id = this.transacao.id;
            const trans = new TransacaoTD(transacaoId);
            trans.coluna = col;
            this.transacao.transacaoTDs.push(trans);
          } else if (!col.isChecked && currTd) {
            const index = this.transacao.transacaoTDs.findIndex(
              (c) => c == currTd
            );
            if (index > -1) {
              this.transacao.transacaoTDs.splice(index, 1);
            }
          }
        });
      });
    });
    this.atualizaContagem();
    this.dialogRef.close(this.transacao);
  }

  atualizaContagem() {
    this.transacao.td = 0;
    this.transacao.tr = 0;
    if (this.transacao.acao) {
      this.transacao.td++;
    }
    if (this.transacao.mensagem) {
      this.transacao.td++;
    }
    this.arquivosReferenciados.forEach((ar) => {
      if (ar.isChecked) this.transacao.tr++;
      ar.tabelas.forEach((t) => {
        t.colunas.forEach((c) => {
          if (c.isChecked) this.transacao.td++;
        });
      });
    });
    this.analisaComplexidade();
    this.analisaPF();
  }

  analisaComplexidade() {
    if (this.transacao.funcao === FuncaoTransacaoEnum.EE) {
      if (
        (this.transacao.td <= 15 && this.transacao.tr < 2) ||
        (this.transacao.td < 5 && this.transacao.tr == 2)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.BAIXA;
      } else if (
        (this.transacao.td < 5 && this.transacao.tr > 2) ||
        (this.transacao.td <= 15 && this.transacao.tr == 2) ||
        (this.transacao.td > 15 && this.transacao.tr < 2)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.MEDIA;
      } else {
        this.transacao.complexidade = ComplexidadeEnum.ALTA;
      }
    } else if (
      this.transacao.funcao == FuncaoTransacaoEnum.CE ||
      this.transacao.funcao == FuncaoTransacaoEnum.SE
    ) {
      if (
        (this.transacao.td <= 19 && this.transacao.tr < 2) ||
        (this.transacao.td < 6 && this.transacao.tr < 3)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.BAIXA;
      } else if (
        (this.transacao.td < 6 && this.transacao.tr <= 3) ||
        (this.transacao.td <= 19 && this.transacao.tr <= 3) ||
        (this.transacao.td > 19 && this.transacao.tr < 2)
      ) {
        this.transacao.complexidade = ComplexidadeEnum.MEDIA;
      } else {
        this.transacao.complexidade = ComplexidadeEnum.ALTA;
      }
    }
  }

  analisaPF() {
    const pfValorArray = {
      EE: { BAIXA: 3, MEDIA: 4, ALTA: 6 },
      CE: { BAIXA: 3, MEDIA: 4, ALTA: 6 },
      SE: { BAIXA: 4, MEDIA: 5, ALTA: 7 },
    };
    this.transacao.pf =
      pfValorArray[this.transacao.funcao][this.transacao.complexidade];
  }
}
