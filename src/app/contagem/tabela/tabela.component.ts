import { ContagemEscopoEnum } from './../contagem-escopo.enum';
import { ContagemService } from '../contagem.service';
import { Component, OnInit } from "@angular/core";
import { Contagem } from "../contagem";
import { MessageService } from '../../shared/Service/message.service';

@Component({
  selector: 'app-contagem-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class ContagemTabelaComponent implements OnInit {
  contagens: Contagem[] = [];

  constructor(
    private contagemService: ContagemService,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.atualizaResultados();
  }

  atualizaResultados(){
    this.contagemService.listar().subscribe(response => {
      this.contagens = response;
    }, error => {
      this.msgService.error('Ocorreu um erro ao descarregar registros!');
          console.log(error);
    });
  }

  getEscopoInfo(contagem: Contagem){
    return contagem.escopo == ContagemEscopoEnum.PROJETO ? ' - Projeto: ' + contagem.projeto.identificador : contagem.escopo == ContagemEscopoEnum.SPRINT ?
      " " + contagem.sprint.numero + " - Projeto: " + contagem.sprint.projeto.identificador : '';
  }

  apagar(contagem: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.contagemService.apagar(contagem).subscribe(
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
