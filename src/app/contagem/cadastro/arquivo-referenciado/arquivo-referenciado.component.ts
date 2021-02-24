import { ContagemItemService } from './../../contagem-item.service';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Contagem } from "../../contagem";
import { MessageService } from 'pje-componentes';
import { ArquivoReferenciado } from './arquivo-referenciado';
import { ArquivoReferenciadoCadastroComponent } from './cadastro/cadastro.component';
import { ContagemItem, TipoContagemItemEnum } from '../../contagem-item';

@Component({
  selector: 'app-contagem-cadastro-arquivo-referenciado',
  templateUrl: './arquivo-referenciado.component.html',
  styleUrls: ['./arquivo-referenciado.component.scss'],
})
export class ArquivoReferenciadoComponent implements OnInit {
  @Input()
  contagem: Contagem;
  @Output()
  somaPFArquivosReferenciados: EventEmitter<ContagemItem[]> = new EventEmitter<ContagemItem[]>();

  arquivosReferenciados: ArquivoReferenciado[] = [];
  subTotalPf = 0;
  constructor(
    public dialog: MatDialog,
    private arquivoReferenciadoService: ContagemItemService,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.updateTableData();
  }

  pfSubtotalAL(){
    this.subTotalPf = 0;
    if(this.contagem && this.contagem.arquivoReferenciado) this.contagem.arquivoReferenciado.forEach(fd => {
      this.subTotalPf += fd.pf;
    });
  }

  updateTableData() {
    this.arquivoReferenciadoService.listar({contagem: this.contagem, tipo: TipoContagemItemEnum.ARQUIVO_REFERENCIADO}).subscribe(response => {
      this.arquivosReferenciados = response.map(m => new ArquivoReferenciado(m));
      this.somaPFArquivosReferenciados.emit(this.arquivosReferenciados);
      console.log('recuperados arquivos referenciados', response);
    }, error => {
      console.log('erro ao recuperar arquivos referenciados', error);
      this.msgService.error("Ocorreu um erro ao recuperar arquivos referenciados.");
    });
  }

  novoEditar(dados: ArquivoReferenciado) {
    if (!dados) dados = new ArquivoReferenciado({ contagem: this.contagem });
    const dialogRef = this.dialog.open(ArquivoReferenciadoCadastroComponent, {
      width: '600px',
      data: { arquivoReferenciado: dados }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.updateTableData();
    });
  }

  apagar(arquivoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    this.arquivoReferenciadoService.apagar(arquivoId).subscribe(
      (msg) => {
        this.updateTableData();
        this.msgService.success('Registro apagado com sucesso.');
      },
      (erro) => {
        console.log("Erro ao apagar arquivo", erro)
        this.msgService.error('Ocorreu um erro ao apagar registro.');
      }
    );
  }
}
