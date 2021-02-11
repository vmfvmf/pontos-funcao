import { SprintsService } from './sprints.service';
import { AppSharedService } from './../app-shared.service';
import { MessageService } from './../shared/message-service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from './sprint';
import { Ded } from '../deds/ded';
import { MatDialog } from '@angular/material/dialog';
import { SprintsCadastroComponent } from './sprints-cadastro/sprints-cadastro.component';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css'],
})
export class SprintsComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    'dataInicio',
    'dataFim',
    'diasUteis',
    'acao',
  ];

  @Input()
  ded: Ded = {};

  constructor(
    public dialog: MatDialog,
    private sprintService: SprintsService,
    private msgService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  novoEditar(sprint: Sprint){
    const dialogRef = this.dialog.open(SprintsCadastroComponent, {
      width: '300px',
      data: {ded: this.ded, sprint: sprint}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.salvar(result);
    });
  }

  salvar(sprint: Sprint) {
    if (sprint.id == undefined) {
      sprint.ded = this.ded;
      this.sprintService.novo(sprint).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          this.ded.sprints.push(sprint);
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    } else {
      this.sprintService.editar(sprint).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    }
    window.location.reload();
  }


  apagar(sprintId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.sprintService.apagar(sprintId).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        window.location.reload();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }

  ver(sprint: Sprint){
    this.router.navigate(['/contagens/' + sprint.id]);
  }
}
