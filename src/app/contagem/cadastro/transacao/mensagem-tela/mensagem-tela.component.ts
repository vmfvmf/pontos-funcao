import { MensagemTelaService } from './mensagem-tela.service';
import { Component, OnInit } from '@angular/core';
import { MensagemTela } from './mensagem-tela';
import { MessageService } from 'pje-componentes';

@Component({
  selector: 'app-mensagem-tela',
  templateUrl: './mensagem-tela.component.html',
  styleUrls: ['./mensagem-tela.component.scss']
})
export class MensagemTelaComponent implements OnInit {
  novoEditar = "Nova";
  mensagemTela: MensagemTela = new MensagemTela({});
  mensagens: MensagemTela[];
  constructor(private mensagemTelaService: MensagemTelaService,
    private msgService: MessageService) { }

  ngOnInit(): void {
    this.updateMensagens();
  }

  updateMensagens(){
    this.mensagemTelaService.listar(new MensagemTela({ })).subscribe(response =>{
      this.mensagens = response;
    }),error => {
      console.log('Erro ao recuperar mensagens', error);
    };
  }

  apagarMensagemTela(mensagem: MensagemTela){
    this.mensagemTelaService.apagar(mensagem.id).subscribe(response =>{
      this.msgService.success("Registro apagado com sucesso.");
      this.updateMensagens();
    }, error => {
      console.log('Erro ao apagar mensagem de tela de id', error, mensagem);
    });
  }

  editarMensagemTela(mensagem: MensagemTela){
    this.mensagemTela = mensagem;
    this.novoEditar = "Editar";
  }

  cancelarEdicao(){
    this.mensagemTela = new MensagemTela({});
    this.novoEditar = "Nova";
  }

  save(){
    this.mensagemTelaService.novo(this.mensagemTela).subscribe((response) =>
    {
      this.updateMensagens();
      this.cancelarEdicao();
      this.msgService.success("Registro salvo com sucesso.");
    }, (error) => {
      console.log("Erro ao salvar novo mensagem de tela", error, "nova mensagem tela", this.mensagemTela);
    });
  }

}
