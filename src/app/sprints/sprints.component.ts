import { AppSharedService } from './../app-shared.service';
import { DedsService } from './../deds/deds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintsService } from './sprints.service';

import { MessageService } from './../shared/message-service';
import { Component, OnInit } from '@angular/core';
import { FiltroSprint } from './filtro-sprint';
import { Sprint } from './sprint';
import { Ded } from '../deds/ded';

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
  sprints: Sprint[] = [];
  ded: Ded = {};

  constructor(
    private msgService: MessageService,
    private sprintService: SprintsService,
    private router: Router,
    private route: ActivatedRoute,
    private shared: AppSharedService
  ) {}

  ngOnInit(): void {
    this.shared.selectedDed.subscribe((ded) => {
      this.ded = ded;
      this.sprintService
      .listar({ded: ded})
      .subscribe((sprints) => {
        this.sprints = sprints;
        this.ded.sprints = sprints;
      });
    });

  }

  ver(sprintId) {
    this.router.navigate(['/deds/' + this.ded.id + '/sprints/' + sprintId]);
  }

  apagar(sprintId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.sprintService.apagar(sprintId).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        this.ngOnInit();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }
}
