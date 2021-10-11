import { DedService } from "../../ded/ded.service";
import { Ded } from "../../ded/ded";
import { MessageService } from "pje-componentes";
import { SprintService } from "../sprints.service";

import { Component, Inject, Input, OnInit } from "@angular/core";
import { Sprint } from "../sprint";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-sprint-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class SprintCadastroComponent implements OnInit {
  sprint: Sprint;
  deds: Ded[];

  constructor(
    private sprintService: SprintService,
    private msgService: MessageService,
    private dedService: DedService,
    public dialogRef: MatDialogRef<SprintCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sprint: Sprint }
  ) {
    this.sprint = data.sprint ? data.sprint : new Sprint({});
  }

  ngOnInit(): void {
    this.dedService.listar().subscribe(
      (response) => {
        this.deds = response;
      },
      (error) => {
        this.msgService.error("Ocorreu um erro ao carregar deds!");
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
