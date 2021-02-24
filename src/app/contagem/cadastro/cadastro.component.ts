import { ContagemItem } from './../contagem-item';
import { MessageService } from 'pje-componentes';
import { Component, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contagem } from "../contagem";
import { ContagemService } from "../contagem.service";
import { Sprint } from '../../sprint/sprint';
import { Ded } from '../../ded/ded';
import { EventEmitter } from 'stream';


@Component({
  selector: 'app-contagem-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class ContagemCadastroComponent implements OnInit {
  contagem: Contagem;
  somaArquivosReferenciados = 0;
  somaTransacoes = 0;
  constructor(
    private msgService: MessageService,
    private contagemService: ContagemService,
    private route: ActivatedRoute,
  ) {
    }

    atualizaContagemArquivosReferenciados(itens: ContagemItem[]){
      this.somaArquivosReferenciados = 0;
      itens.forEach(item => this.somaArquivosReferenciados+= item.pf);
      this.contagem.totalPf = this.somaArquivosReferenciados + this.somaTransacoes;
      this.salvarContagem();
    }

    atualizaContagemTransacaos(itens: ContagemItem[]){
      this.somaTransacoes = 0;
      itens.forEach(item => this.somaTransacoes+= item.pf);
      this.contagem.totalPf = this.somaArquivosReferenciados + this.somaTransacoes;
      this.salvarContagem();
    }

    salvarContagem(){
      this.contagemService.salvar(this.contagem).subscribe(
        response => console.log("contagem salva", response),
        error => console.log("erro salvar contagem", error)
        );
    }
  ngOnInit(): void {
    this.updateData();
}

  updateData(){
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
