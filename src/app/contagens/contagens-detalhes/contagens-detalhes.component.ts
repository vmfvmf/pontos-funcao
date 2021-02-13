import { TabelasService } from './../../tabelas/tabelas.service';
import { MessageService } from './../../shared/message-service';
import { FuncaoDadosService } from './contagens-funcao-dados/funcao-dados.service';
import { ContagensService } from './../contagens.service';
import { Component, OnInit } from '@angular/core';
import { Contagem } from '../contagem';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FuncaoDados } from './contagens-funcao-dados/funcao-dados';
import { ContagensFuncaoDadosComponent } from './contagens-funcao-dados/contagens-funcao-dados.component';
import { Tabela } from 'src/app/tabelas/tabela';
import { ColunasService } from 'src/app/tabelas/colunas.service';

@Component({
  selector: 'app-contagens-detalhes',
  templateUrl: './contagens-detalhes.component.html',
  styleUrls: ['./contagens-detalhes.component.css'],
})
export class ContagensDetalhesComponent implements OnInit {
  contagem: Contagem;
  displayedColumns = ['nome', 'tipo', 'td', 'valor', 'acao'];
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private funcaoDadosServico: FuncaoDadosService,
    private tabelaService: TabelasService,
    private colunaService: ColunasService,
    private contagemService: ContagensService,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (+params['contagemId']) {
        this.contagemService
          .ver(+params['contagemId'])
          .subscribe((contagem) => (this.contagem = contagem));
      }
    });
  }

  novoEditar(dados: FuncaoDados){
    if(!dados) dados = new FuncaoDados({ tabelas: [] });
    dados.contagem = {id: this.contagem.id};
    const dialogRef = this.dialog.open(ContagensFuncaoDadosComponent, {
      width: '600px',
      data: {funcaoDados: dados}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) this.salvar(result);
    });
  }

  salvarTabelas(dados: FuncaoDados){
    dados.tabelas.forEach(t => t.funcaoDados = new FuncaoDados({id: dados.id}))
    this.tabelaService.salvaEmLote(dados.tabelas).subscribe(
      (response) => {
        console.log("Response do objeto Tabelas",response);
        this.salvarColunas(response);
      },
      (error) => {
        console.log("Error do objeto Tabelas",error);
      }
    );
  }

  salvarColunas(tabelas: Tabela[]){
    tabelas.forEach(t => {
      t.colunas.forEach(c => {
        c.tabela = new Tabela({id: t.id});
      });
      this.colunaService.salvaEmLote(t.colunas).subscribe(
        (response) => {
          console.log("Response do objeto Colunas",response);
        },
        (error) => {
          console.log("Error do objeto Colunas",error);
        }
      );
    });

  }

  salvar(arquivo: FuncaoDados) {
    if (arquivo.id == undefined) {
      this.funcaoDadosServico.novo(arquivo).subscribe(
        (response) => {
          console.log("Response novo objeto ContagemItem",response);
          this.salvarTabelas(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log("Erro novo objeto ContagemItem",error);
        }
      );
    } else {
      this.funcaoDadosServico.editar(arquivo).subscribe(
        (response) => {
          console.log("Response editar objeto ContagemItem",response);
          this.salvarTabelas(response);
        },
        (error) => {
          this.msgService.error('Ocorreu um erro ao salvar!');
          console.log("Erro editar objeto ContagemItem",error);
        }
      );
    }
    // window.location.reload();
  }


  apagar(arquivoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.funcaoDadosServico.apagar(arquivoId).subscribe(
      (msg) => {
        this.msgService.success('Registro apagado com sucesso.');
        window.location.reload();
      },
      (erro) => {
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }

  // ver(sprint: Sprint){
  //   this.router.navigate(['/contagens/' + sprint.id]);
  // }
}
