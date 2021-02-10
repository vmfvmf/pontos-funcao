import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class MessageService {

  constructor(public snackBar: MatSnackBar) { }

  dismiss(): void {
    this.snackBar.dismiss();
  }

  success(message: string, duration?: number): void {
    this.abrirSnackBar(message, ['success'], duration);
  }

  error(message: string, duration?: number): void {
    this.abrirSnackBar(message, ['error'], duration);
  }

  warning(message: string, duration?: number): void {
    this.abrirSnackBar(message, ['warning'], duration);
  }

  info(message: string, duration?: number): void {
    this.abrirSnackBar(message, ['info'], duration);
  }

  addError(httpError: HttpErrorResponse): void {
    if ( httpError.status === 0 ) {
      // connection refused, server not reachable
        this.error('Problema com a comunicação com o servidor');
    } else {
      if (this.isJson(httpError)) {
        const jsonErro = httpError.error;
        this.error(jsonErro['mensagem'] + ' (' + jsonErro['codigoErro'] +  ') : ' + jsonErro['identificadorRequisicao']);
      } else {
        this.error(String(httpError.error));
      }
    }
  }

  private isJson(response: HttpErrorResponse): boolean {
    if (response) {
      return response.headers.get('content-type').indexOf('/json') !== -1;
    }
    return false;
  }

  private abrirSnackBar(message: string, extraClasses: string[], duration: number = 10000): void {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.politeness = 'assertive';
    config.panelClass = extraClasses;
    this.snackBar.open(message, 'X', config);
  }
}
