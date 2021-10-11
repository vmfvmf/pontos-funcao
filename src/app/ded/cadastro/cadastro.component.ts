import { SistemaService } from './../../sistema/sistema.service';
import { DedService } from '../ded.service';
import { Ded } from '../ded';
import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'pje-componentes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ded-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class DedCadastroComponent implements OnInit {
  ded: Ded = new Ded({});
  novoCadastro: boolean= true;
  sistemas = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {ded: Ded},
    public dialogRef: MatDialogRef<DedCadastroComponent>,
    private dService: DedService,
    private sService: SistemaService,
    private mService: MessageService
    ) {
      this.ded = data.ded ? data.ded : new Ded({});
    }

  ngOnInit(): void {
    this.sService.listar({}).subscribe(
      (response) => {
        this.sistemas = response;
      },
      (error) => {
        this.mService.error("Ocorreu um erro ao carregar sistemas!");
        console.log(error);
      }
    );
  }

  close(){
    this.dialogRef.close(null);
  }

  salvar(){
    if(this.ded.id){
      this.dService.editar(this.ded).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
         }, () => this.close()
        );
    } else {
      this.dService.novo(this.ded).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }, () => this.close()
        );
    }
  }
}
