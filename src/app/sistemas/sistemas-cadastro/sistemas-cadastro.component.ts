import { SistemasService } from '../sistemas.service';
import { Sistema } from '../sistema';
import { MessageService } from '../../shared/message-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sistemas-cadastro',
  templateUrl: './sistemas-cadastro.component.html',
  styleUrls: ['./sistemas-cadastro.component.css']
})
export class SistemasCadastroComponent implements OnInit {
  sistema: Sistema = new Sistema({});
  novoCadastro: boolean= true;

  constructor(
    private sService: SistemasService,
    private router: Router,
    private route: ActivatedRoute,
    private mService: MessageService
    ) { }

  ngOnInit(): void {
    if(this.router.url.indexOf('/editar') > -1){
      this.route.params.subscribe(params => {
        this.sistema.id = +params['id'];
          this.novoCadastro = false;
          this.sService.ver(this.sistema.id).subscribe(
            ded => this.sistema = ded
          )
      });
    }
  }

  salvar(){
    if(this.novoCadastro){
      this.sService.novo(this.sistema).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }
        );
    } else {
      this.sService.editar(this.sistema).subscribe(
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
