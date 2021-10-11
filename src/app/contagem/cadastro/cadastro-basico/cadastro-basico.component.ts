import { ContagemService } from './../../contagem.service';
import {
  ContagemEscopoDesc,
  ContagemEscopoEnum,
  contagemEscoposArray,
} from "./../../contagem-escopo.enum";
import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "pje-componentes";
import { Ded } from "../../../ded/ded";
import { DedService } from "../../../ded/ded.service";
import { Sistema } from "../../../sistema/sistema";
import { SistemaService } from "../../../sistema/sistema.service";
import { Sprint } from "../../../sprint/sprint";
import { SprintService } from "../../../sprint/sprints.service";
import { Contagem } from "../../contagem";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-contagem-cadastro-basico",
  templateUrl: "./cadastro-basico.component.html",
  styleUrls: ["./cadastro-basico.component.scss"],
})
export class ContagemCadastroBasicoComponent implements OnInit {
  ContagemEscopoEnum: typeof ContagemEscopoEnum = ContagemEscopoEnum;
  escopoDesc = ContagemEscopoDesc;
  escopos = contagemEscoposArray;
  sistemas: Sistema[] = [];
  deds: Ded[] = [];
  sprints: Sprint[] = [];
  @Input()
  contagem: Contagem = {};
  selectedDed: Ded;

  constructor(
    private sistemaService: SistemaService,
    private msgService: MessageService,
    private dedService: DedService,
    private sprintService: SprintService,
    private contagemService: ContagemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sistemaService.listar().subscribe(
      (response) => {
        console.log("Sistemas recuperado com sucesso", response);
        this.sistemas = response;
      },
      (error) => {
        this.msgService.error(
          "Ocorreu um erro ao recuperar lista de sistemas."
        );
        console.log("Erro ao recuperar sistemas", error);
      }
    );
    this.dedService.listar().subscribe(
      (response) => {
        console.log("Deds recuperado com sucesso", response);
        this.deds = response;
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao recuperar lista de deds.");
        console.log("Erro ao recuperar deds", error);
      }
    );
  }

  salvar() {
    if (this.contagem.id) {
    } else {
      this.contagemService.salvar(this.contagem).subscribe(
        (response) => {
          this.msgService.success("O registro foi salvo com sucesso.");
          this.router.navigate(['../editar/',response.id], { relativeTo: this.route });
        },
        (error) => {
          this.msgService.error("Ocorreu um erro ao salvar.");
          console.log("Erro ao salvar", error);
        }
      );
    }
  }

  escopoChange() {
    this.contagem.ded = new Ded({});
    this.contagem.sprint = new Sprint({});
  }

  dedChange(ded: Ded) {
    if (this.contagem.escopo === "SPRINT") {
      this.sprintService.listar({ ded: { id: ded.id } }).subscribe(
        (response) => {
          this.sprints = response;
        },
        () => {
          this.msgService.error(
            "Ocorreu um erro ao recuperar lista de sprints."
          );
        }
      );
    }
  }
}
