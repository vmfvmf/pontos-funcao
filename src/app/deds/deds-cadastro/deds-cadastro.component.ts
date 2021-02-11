import { SprintsComponent } from './../../sprints/sprints.component';
import { MessageService } from './../../shared/message-service';
import { DedsService } from './../deds.service';
import { Ded } from './../ded';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deds-cadastro',
  templateUrl: './deds-cadastro.component.html',
  styleUrls: ['./deds-cadastro.component.css']
})
export class DedsCadastroComponent implements OnInit {
  ded: Ded = new Ded({});
  novoCadastro: boolean= true;

  @ViewChild(SprintsComponent)
  sprintComponent: SprintsComponent;

  constructor(
    private dService: DedsService,
    private router: Router,
    private route: ActivatedRoute,
    private mService: MessageService
    ) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        if(+params['id']){
          this.ded.id = +params['id'];
          this.novoCadastro = false;
          this.dService.ver(this.ded.id).subscribe(
            ded => {
              this.ded = ded;
              this.sprintComponent.ded = ded;
            }
          );
        }
    });
  }


  salvar(){
    if(this.novoCadastro){
      this.dService.novo(this.ded).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }
        );
    } else {
      this.dService.editar(this.ded).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
         }
        );
    }

  }
}
