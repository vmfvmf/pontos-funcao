import { ContagemService } from "./../../contagem.service";
import {
  ContagemEscopoDesc,
  ContagemEscopoEnum,
  contagemEscoposArray,
} from "./../../contagem-escopo.enum";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Projeto } from "../../../projeto/projeto";
import { ProjetoService } from "../../../projeto/projeto.service";
import { Sistema } from "../../../sistema/sistema";
import { SistemaService } from "../../../sistema/sistema.service";
import { Sprint } from "../../../sprint/sprint";
import { SprintService } from "../../../sprint/sprints.service";
import { Contagem } from "../../contagem";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../../shared/Service/message.service";
import { FormBuilder, NgForm } from "@angular/forms";

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
  projetos: Projeto[] = [];
  sprints: Sprint[] = [];
  versoes: Contagem[] = [];
  selectedProjeto: Projeto;
  versaoComparar: boolean;

  @ViewChild('f') public form: NgForm;

  @Input()
  somenteLeitura = true;

  @Input()
  contagem: Contagem = new Contagem();

  @Output()
  versionarEmitter: EventEmitter<void> = new EventEmitter();

  @Output()
  criarEsbocoEmitter: EventEmitter<void> = new EventEmitter();

  @Output()
  compararVersaoEmitter: EventEmitter<Contagem> = new EventEmitter();


  constructor(
    private sistemaService: SistemaService,
    private msgService: MessageService,
    private projetoService: ProjetoService,
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
    this.projetoService.listar().subscribe(
      (response) => {
        console.log("Projetos recuperado com sucesso", response);
        this.projetos = response;
      },
      (error) => {
        this.msgService.error(
          "Ocorreu um erro ao recuperar lista de projetos."
        );
        console.log("Erro ao recuperar projetos", error);
      }
    );
    this.contagemService.listarVersoes(this.contagem).subscribe(
      versoes => this.versoes = versoes
    );
    if (this.contagem.sprint?.id) {
      this.contagem.projeto = this.contagem.sprint.projeto;
      this.sprintService.listar(new Sprint(this.contagem.sprint.projeto)).subscribe(
        response => {
          this.sprints = response;
        }
      );
    }
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }
    this.contagemService.salvar(this.contagem).subscribe(
      (response) => {
        this.msgService.success("O registro foi salvo com sucesso.");
        if (!this.contagem.id) {this.router.navigate(["../editar/", response.id], {
            relativeTo: this.route,
          });
        }
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao salvar.");
        console.log("Erro ao salvar", error);
      }
    );
  }

  escopoChange() {
    this.contagem.projeto = new Projeto();
    this.contagem.sprint = new Sprint();
  }

  projetoChange(projeto: Projeto) {
    if (this.contagem.escopo === "SPRINT") {
      this.sprintService.listar(new Sprint(projeto)).subscribe(
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
