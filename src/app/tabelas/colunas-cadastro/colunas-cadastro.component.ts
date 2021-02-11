import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coluna, Tabela } from '../tabela';

@Component({
  selector: 'app-colunas-cadastro',
  templateUrl: './colunas-cadastro.component.html',
  styleUrls: ['./colunas-cadastro.component.css']
})
export class ColunasCadastroComponent implements OnInit {
    coluna: Coluna = {};
    constructor(public dialogRef: MatDialogRef<ColunasCadastroComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {coluna: Coluna, tabela: Tabela}) {
        this.coluna = data.coluna;
        this.coluna.tabela = data.tabela;
      }

    ngOnInit(): void {
    }

    onNoClick(){
      this.dialogRef.close();
    }

  }
