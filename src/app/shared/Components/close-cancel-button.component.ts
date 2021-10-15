import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-close-cancel-button',
  template: `<button name="close-cancel-button" mat-button mat-dialog-close>{{ somenteLeitura ? 'Fechar' : 'Cancelar'}}</button>`
})
export class CloseCancelButtonComponent implements OnInit {
  @Input()
  somenteLeitura: boolean;

  ngOnInit(): void {
  }
}
