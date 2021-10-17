import { ContagemCadastroBasicoComponent } from "./cadastro-basico/cadastro-basico.component";
import { Transacao } from "./transacao/transacao";
import { ArquivoReferenciado } from "./arquivo-referenciado/arquivo-referenciado";

import {Location} from '@angular/common';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contagem } from "../contagem";
import { ContagemService } from "../contagem.service";
import { MessageService } from "../../shared/Service/message.service";

@Component({
  selector: "app-contagem-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class ContagemCadastroComponent implements OnInit {
  contagem: Contagem;
  somaArquivosReferenciados = 0;
  somaTransacoes = 0;
  somenteLeitura = true;
  versaoComparar: Contagem;

  @ViewChild("f2") public form2: ContagemCadastroBasicoComponent;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private msgService: MessageService,
    private contagemService: ContagemService
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  salvarContagem(resp: { msg: string; item: ArquivoReferenciado | Transacao }) {
    if (this.form2.form.invalid) {
      return;
    }
    if (resp.item instanceof ArquivoReferenciado) {
      if (resp.item.id) {
        const i = this.contagem.arquivosReferenciados.findIndex(
          (arq) => arq.id === resp.item.id
        );
        this.contagem.arquivosReferenciados[i] = resp.item;
      } else {
        this.contagem.arquivosReferenciados.push(resp.item);
      }
    } else if (resp.item instanceof Transacao) {
      if (resp.item.id) {
        const i = this.contagem.transacoes.findIndex(
          (trans) => trans.id === resp.item.id
        );
        this.contagem.transacoes[i] = resp.item;
      } else {
        this.contagem.transacoes.push(resp.item);
      }
    }
    this.contagemService.salvar(this.contagem).subscribe(
      (response) => {
        if (response) {
          this.contagem = response;
          if (resp.msg) {
            this.msgService.success(resp.msg);
          }
          console.log("contagem salva", response);
        }
      },
      (error) => console.log("erro salvar contagem", error)
    );
  }

  criarEsboco() {
    this.contagemService.criarEsboco(this.contagem.id).subscribe(
      (response) => {
        this.router.navigate([`../`, response.id], {
          relativeTo: this.route,
        });
        this.msgService.success("O esboço foi criado com sucesso.");
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar.");
        console.log("Erro ao salvar", error);
      }
    );
  }

  versionar() {
    this.contagemService.versionar(this.contagem.id).subscribe(
      (response) => {
        this.contagem = response;
        this.somenteLeitura = this.contagem.estado === "V";
        this.msgService.success("A contagem foi versionada com sucesso.");
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar.");
        console.log("Erro ao salvar", error);
      }
    );
  }

  updateData() {
    this.route.params.subscribe((params) => {
      if (params["contagemId"] && params["versaoId"]) {
        this.contagemService.compararVersaoAnterior(+params["contagemId"], +params["versaoId"]).subscribe(contagemComparada => {
          this.somenteLeitura = true;
           this.contagem = contagemComparada;
        });
      } else if (params["contagemId"]) {
        this.contagemService.ver(+params["contagemId"]).subscribe(
          (response) => {
            console.log("Contagem recuperada", response);
            this.contagem = response;
            this.somenteLeitura = this.contagem.estado === "V";
          },
          (error) => {
            this.msgService.error("Ocorreu um erro ao recuperar contagem.");
            console.log("Erro ao recuperar contagem", error);
          }
        );
      } else {
        this.contagem = new Contagem();
      }
    });
  }
}
