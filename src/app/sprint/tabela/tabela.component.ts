import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Sprint } from "../sprint";
import { SprintCadastroComponent } from "../cadastro/cadastro.component";
import { SprintService } from "../sprints.service";
import { MessageService } from "../../shared/Service/message.service";


@Component({
  selector: 'app-sprint-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class SprintTabelaComponent implements OnInit {
  sprints: Sprint[] = [];
  constructor(
    public dialog: MatDialog,
    private sprintService: SprintService,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.atualizaResultados();
  }
  atualizaResultados() {
    this.sprintService.listar().subscribe(response => {
      this.sprints = response;
    });
  }

  novoEditar(sprint: Sprint){
    const dialogRef = this.dialog.open(SprintCadastroComponent, {
      width: '300px',
      data: {sprint: sprint}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizaResultados();
    });
  }



  apagar(sprintId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.sprintService.apagar(sprintId).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        this.atualizaResultados();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }
}
