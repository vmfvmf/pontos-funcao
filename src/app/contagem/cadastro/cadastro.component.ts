import { MessageService } from 'pje-componentes';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contagem } from "../contagem";
import { ContagemService } from "../contagem.service";
import { Sprint } from '../../sprint/sprint';
import { Ded } from '../../ded/ded';


@Component({
  selector: 'app-contagem-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class ContagemCadastroComponent implements OnInit {
  contagem: Contagem;

  constructor(
    private msgService: MessageService,
    private contagemService: ContagemService,
    private route: ActivatedRoute,
  ) {
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(params['contagemId']){
        this.contagemService.ver(+params['contagemId']).subscribe(response =>{
          console.log("Contagem recuperada", response);
          this.contagem = response;
        }, error => {
          this.msgService.error("Ocorreu um erro ao recuperar contagem.");
          console.log("Erro ao recuperar contagem", error);
        });
      }else{
        this.contagem = new Contagem({ });
      }
    });
  }
}
