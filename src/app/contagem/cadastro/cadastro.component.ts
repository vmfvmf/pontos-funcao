import { Transacao } from './transacao/transacao';
import { ArquivoReferenciado } from './arquivo-referenciado/arquivo-referenciado';

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contagem } from "../contagem";
import { ContagemService } from "../contagem.service";
import { AbstractContagemItem } from "../abstract-contagem-item";
import { MessageService } from "../../shared/Service/message.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-contagem-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class ContagemCadastroComponent implements OnInit {
  contagem: Contagem;
  somaArquivosReferenciados = 0;
  somaTransacoes = 0;
  @ViewChild('f') public form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private msgService: MessageService,
    private contagemService: ContagemService
  ) {}

  salvarContagem(resp: {msg: string, item: AbstractContagemItem}) {
    if(this.form.invalid) {
      return;
    }
    if (resp.item instanceof ArquivoReferenciado) {
      this.contagem.arquivosReferenciados.push(resp.item);
    } else if (resp.item instanceof Transacao) {
      this.contagem.transacoes.push(resp.item);
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

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.route.params.subscribe((params) => {
      if (params["contagemId"]) {
        this.contagemService.ver(+params["contagemId"]).subscribe(
          (response) => {
            console.log("Contagem recuperada", response);
            this.contagem = response;
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
