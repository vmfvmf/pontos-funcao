import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-edit-button',
  template: `
  <mat-icon
    style="cursor: pointer;"
    (click)="edit()"
    [matTooltip]="'Editar ' + complemento"
    class="material-icons md-24"
    >folder_open</mat-icon
  >`
})
export class EditButtonComponent implements OnInit {
  @Output()
  editEmitter = new EventEmitter();

  @Input()
  complemento: string;

  @Input()
  objeto: any;

  @Input()
  somenteLeitura: boolean;

  ngOnInit(): void {
  }

  edit() {
    this.editEmitter.emit(this.objeto);
  }

}
