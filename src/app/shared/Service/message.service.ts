// TODO: mover esse servico para um agregador geral (util?)
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class MessageService {

  constructor(public snackBar: MatSnackBar) { }

  success(message: string): void {
    this.abrirSnackBar(message, ['success']);
  }

  error(message: string): void {
    this.abrirSnackBar(message, ['error']);
  }

  warning(message: string): void {
    this.abrirSnackBar(message, ['warning']);
  }

  info(message: string): void {
    this.abrirSnackBar(message, ['info']);
  }

  addError(httpError: HttpErrorResponse): void {
    this.error(this.obterMensagemDeErro(httpError));
  }

  public obterMensagemDeErro(httpError: HttpErrorResponse): string {
    if ( httpError.status === 0 ) {
      // connection refused, server not reachable
      return 'Problema com a comunicação com o servidor';
    } else {
      if (this.isJson(httpError)) {
        const jsonErro = httpError.error;
        return jsonErro['mensagem'] + ' (' + jsonErro['codigoErro'] +  ') : ' + jsonErro['identificadorRequisicao'];
      } else {
        return String(httpError.error);
      }
    }
  }

  private isJson(response: HttpErrorResponse): boolean {
    if (response) {
      const contentType = response.headers.get('content-type');
      if (contentType) {
        return contentType.indexOf('/json') !== -1;
      }
    }
    return false;
  }

  private abrirSnackBar(message: string, extraClasses: string[]): void {
    const config = new MatSnackBarConfig();
    config.duration = 10000;
    config.politeness = 'assertive';
    config.panelClass = extraClasses;
    this.snackBar.open(message, 'X', config);
  }
}
