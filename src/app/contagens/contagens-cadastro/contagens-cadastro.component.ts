import { SistemasService } from './../../sistemas/sistemas.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Sistema } from 'src/app/sistemas/sistema';
import { Contagem } from '../contagem';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contagens-cadastro',
  templateUrl: './contagens-cadastro.component.html',
  styleUrls: ['./contagens-cadastro.component.css']
})
export class ContagensCadastroComponent implements OnInit {
  sistemas: Sistema[] = [];
  contagem: Contagem = {};

  constructor(
    private sistemaService: SistemasService,
    public dialogRef: MatDialogRef<ContagensCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {contagem: Contagem}) {
      this.contagem = data.contagem;
      this.sistemaService.listar({}).subscribe(
        sistemas => {
          this.sistemas = sistemas
        }
      )
    }

  ngOnInit(): void {

  }

  onNoClick(){
    this.dialogRef.close();
  }

}
