import { MessageService } from './../shared/message-service';
import { ContagensService } from './contagens.service';
import { Contagem, EscopoContagemEnum } from './contagem';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContagensCadastroComponent } from './contagens-cadastro/contagens-cadastro.component';
import { Sprint } from '../sprints/sprint';
import { ActivatedRoute } from '@angular/router';
import { SprintsService } from '../sprints/sprints.service';

@Component({
  selector: 'app-contagens',
  templateUrl: './contagens.component.html',
  styleUrls: ['./contagens.component.css'],
})
export class ContagensComponent implements OnInit {
  sprint: Sprint = {};
  displayedColumns: string[] = [
    'sprint',
    'sistema',
    'contador',
    'dataContagem',
    'acao'
  ];
  constructor(
    public dialog: MatDialog,
    private sprintService: SprintsService,
    private contagemService: ContagensService,
    private route: ActivatedRoute,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sprint = { id: +params['sprintId'] };
    });
    this.sprintService.ver(this.sprint.id).subscribe(
      sprint => {
        this.sprint = sprint;
      }
    );
  }

  novoEditar(contagem: Contagem) {
    const dialogRef = this.dialog.open(ContagensCadastroComponent, {
      width: '300px',
      data: { contagem: contagem },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.salvar(result);
    });
  }

  sistemaNome(contagem: Contagem){
    this.contagemService.verSistema(contagem.id).subscribe(
      sistema => {
        contagem.sistema = sistema
      }
    );
  }

  salvar(contagem: Contagem) {
    if(contagem.id == undefined){
      contagem.sprint = this.sprint;
      contagem.escopo = EscopoContagemEnum.SPRINT;
      this.contagemService.novo(contagem).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    } else {
      this.contagemService.editar(contagem).subscribe(
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

    // window.location.reload();
  }

  apagar(contagem: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.contagemService.apagar(contagem).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        window.location.reload();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }

  ver(contagem: Contagem) {
    // this.router.navigate(['/contagens/' + sprint.id]);
  }
}
