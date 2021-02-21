import { ContagemService } from '../contagem.service';
import { Component, OnInit } from "@angular/core";
import { MessageService } from "pje-componentes";
import { Contagem, EscopoContagemEnum } from "../contagem";

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
    return contagem.escopo == EscopoContagemEnum.PROJETO ? ' - DED: ' + contagem.ded.numero : contagem.escopo == EscopoContagemEnum.SPRINT ?
      " " + contagem.sprint.numero + " - DED: " + contagem.sprint.ded.numero : '';
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

}
