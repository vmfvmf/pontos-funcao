import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sistema } from 'src/app/sistemas/sistema';
import { Tabela } from '../tabela';

@Component({
  selector: 'app-tabelas-cadastro',
  templateUrl: './tabelas-cadastro.component.html',
  styleUrls: ['./tabelas-cadastro.component.css']
})
export class TabelasCadastroComponent implements OnInit {

  tabela: Tabela = new Tabela({});
  constructor(public dialogRef: MatDialogRef<TabelasCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tabela: Tabela, sistema: Sistema}) {
      this.tabela = data.tabela;
    }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
