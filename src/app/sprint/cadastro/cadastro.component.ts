import { ProjetoService } from "../../projeto/projeto.service";
import { Projeto } from "../../projeto/projeto";
import { SprintService } from "../sprints.service";

import { Component, Inject, Input, OnInit } from "@angular/core";
import { Sprint } from "../sprint";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "../../shared/Service/message.service";

@Component({
  selector: "app-sprint-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class SprintCadastroComponent implements OnInit {
  sprint: Sprint;
  projetos: Projeto[];

  constructor(
    private sprintService: SprintService,
    private msgService: MessageService,
    private projetoService: ProjetoService,
    public dialogRef: MatDialogRef<SprintCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sprint: Sprint }
  ) {
    this.sprint = data.sprint ? data.sprint : new Sprint();
  }

  ngOnInit(): void {
    this.projetoService.listar().subscribe(
      (response) => {
        this.projetos = response;
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao carregar projetos!");
        console.log(error);
      }
    );
  }

  salvar() {
    if (!this.sprint.id) {
      this.sprintService.novo(this.sprint).subscribe(
        (response) => {
          this.msgService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.msgService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }, () => this.dialogRef.close(null)
      );
    } else {
      this.sprintService.editar(this.sprint).subscribe(
        (response) => {
          this.msgService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.msgService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }, () => this.dialogRef.close(null)
      );
    }
  }
}
