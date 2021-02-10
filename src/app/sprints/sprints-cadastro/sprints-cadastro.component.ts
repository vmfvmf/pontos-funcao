import { AppSharedService } from './../../app-shared.service';
import { MessageService } from './../../shared/message-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintsService } from './../sprints.service';
import { Component, OnInit } from '@angular/core';
import { Sprint } from '../sprint';
import { Ded } from 'src/app/deds/ded';

@Component({
  selector: 'app-sprints-cadastro',
  templateUrl: './sprints-cadastro.component.html',
  styleUrls: ['./sprints-cadastro.component.css'],
})
export class SprintsCadastroComponent implements OnInit {
  sprint: Sprint = {};
  ded: Ded = {};
  novoCadastro: boolean = true;

  constructor(
    private sprintService: SprintsService,
    private router: Router,
    private route: ActivatedRoute,
    private mService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (this.router.url.indexOf('/editar') > -1) {
        this.sprint.id = +params['id'];
        this.novoCadastro = false;
        this.sprintService
          .ver(this.sprint.id)
          .subscribe((sprint) => (this.sprint = sprint));
      }
      this.ded.id = +params['ded_id'];
    });
  }

  salvar() {
    this.sprint.ded = this.ded;
    if (this.novoCadastro) {
      this.sprintService.novo(this.sprint).subscribe(
        (response) => {
          this.mService.success('Registro salvo com sucesso!');
        },
        (error) => {
          this.mService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    } else {
      this.sprintService.editar(this.sprint).subscribe(
        (response) => {
          this.mService.success('Registro salvo com sucesso!');
        },
        (error) => {
          this.mService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    }
  }
}
