import { Sistema } from '../sistema';
import { Component, Inject, OnInit } from '@angular/core';
import { SistemaService } from '../sistema.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../shared/Service/message.service';

@Component({
  selector: 'app-sistemas-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class SistemaCadastroComponent implements OnInit {
  sistema: Sistema = new Sistema();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {sistema: Sistema},
    public dialogRef: MatDialogRef<SistemaCadastroComponent>,
    private sService: SistemaService,
    private mService: MessageService
    ) {
      this.sistema = data.sistema || new Sistema();
    }

  ngOnInit(): void {
  }

  salvar(){
    if(!this.sistema.id){
      this.sService.novo(this.sistema).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }, () => this.dialogRef.close(null)
        );
    } else {
      this.sService.editar(this.sistema).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
         }, () => this.dialogRef.close(null)
        );
    }
  }
}
