import { ColunasService } from './colunas.service';
import { MessageService } from './../shared/message-service';
import { TabelasService } from './tabelas.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coluna, Tabela } from './tabela';
import { Sistema } from '../sistemas/sistema';
import { TabelasCadastroComponent } from './tabelas-cadastro/tabelas-cadastro.component';
import { ColunasCadastroComponent } from './colunas-cadastro/colunas-cadastro.component';

@Component({
  selector: 'app-tabelas',
  templateUrl: './tabelas.component.html',
  styleUrls: ['./tabelas.component.css']
})
export class TabelasComponent implements OnInit {
  tabelas: Tabela[];
  colunas: Coluna[];
  selectedTabela: Tabela;

  @Input()
  selectedSistema: Sistema;

  constructor(public dialog: MatDialog,
    private tabelaService: TabelasService,
    private msgService: MessageService,
    private colunaService: ColunasService) { }

  ngOnInit(): void {
    this.tabelaService.listar(new Tabela({})).subscribe(
      lista => this.tabelas = lista
    );
  }

  novoEditarColuna(coluna: Coluna){
    const dialogRef = this.dialog.open(ColunasCadastroComponent, {
      width: '300px',
      data: {coluna: coluna, tabela: this.selectedTabela[0]}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) this.salvarColuna(result);
    });
  }

  showColunas(){
    this.colunaService.listar({tabela: this.selectedTabela[0]}).subscribe(
      lista => this.colunas = lista
    );
  }

  salvarColuna(coluna: Coluna) {
    if (coluna.id == undefined) {
      this.colunaService.novo(coluna).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    } else {
      this.colunaService.editar(coluna).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    }
    // window.location.reload();
  }


  novoEditar(tabela: Tabela){
    const dialogRef = this.dialog.open(TabelasCadastroComponent, {
      width: '300px',
      data: {tabela: tabela, sistema: this.selectedSistema}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) this.salvar(result);
    });
  }

  salvar(tabela: Tabela) {
    if (tabela.id == undefined) {
      this.tabelaService.novo(tabela).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    } else {
      this.tabelaService.editar(tabela).subscribe(
        (response) => {
          this.msgService.success('Registro salvo com sucesso!');
          console.log(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log(error);
        }
      );
    }
    // window.location.reload();
  }


  apagar(tabelaId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.tabelaService.apagar(tabelaId).subscribe(
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
