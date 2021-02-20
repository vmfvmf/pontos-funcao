import { ContagemService } from '../../contagem.service';
import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "pje-componentes";
import { Ded } from "../../../ded/ded";
import { DedService } from "../../../ded/ded.service";
import { Sistema } from "../../../sistema/sistema";
import { SistemaService } from "../../../sistema/sistema.service";
import { Sprint } from "../../../sprint/sprint";
import { SprintService } from "../../../sprint/sprints.service";
import { Contagem, EscopoContagemEnum } from "../../contagem";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contagem-cadastro-basico',
  templateUrl: './cadastro-basico.component.html',
  styleUrls: ['./cadastro-basico.component.scss']
})
export class ContagemCadastroBasicoComponent implements OnInit {
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
  ) {
    }


  ngOnInit(): void {
    this.sistemaService.listar({}).subscribe(response => {
      console.log("Sistemas recuperado com sucesso", response);
      this.sistemas = response;
    }, error => {
      this.msgService.error("Ocorreu um erro ao recuperar lista de sistemas.");
      console.log("Erro ao recuperar sistemas", error);
    });
    this.dedService.listar().subscribe(response => {
      console.log("Deds recuperado com sucesso", response);
      this.deds = response;
    }, error => {
      this.msgService.error("Ocorreu um erro ao recuperar lista de deds.");
      console.log("Erro ao recuperar deds", error);
    });
    this.sprintService.listar({}).subscribe(response => {
      console.log("Sprints recuperado com sucesso", response);
      this.sprints = response;
    }, error => {
      this.msgService.error("Ocorreu um erro ao recuperar lista de sprints.");
      console.log("Erro ao recuperar sprints", error);
    });
  }

  getSprints(){
    return  this.contagem.sprint.ded ? this.sprints.filter(sp => sp.ded.id == this.contagem.sprint.ded.id) : null;
  }

    dedChange(ded: Ded){
      this.selectedDed = ded;
      // this.sprintService.listar({ded: {id: ded.id}}).subscribe(response => {
      //   console.log("Sprints recuperado com sucesso", response);
      //   this.sprints = response;
      // }, error => {
      //   this.msgService.error("Ocorreu um erro ao recuperar lista de sprints.");
      //   console.log("Erro ao recuperar sprints", error);
      // });
    }

  salvar(){
    if(this.contagem.id){

    }else {
      this.contagem.escopo = EscopoContagemEnum.SPRINT;
      this.contagemService.novo(this.contagem).subscribe(response => {
        this.msgService.success("O registro foi salvo com sucesso.");
        this.router.navigate([response.id], { relativeTo: this.route });
      },error => {
        this.msgService.error("Ocorreu um erro ao salvar.");
        console.log("Erro ao salvar", error);
      });
    }
  }

}
