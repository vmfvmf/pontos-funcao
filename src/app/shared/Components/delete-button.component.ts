import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-delete-button',
  template: `
  <mat-icon
    style="cursor: pointer;"
    (click)="delete()"
    [matTooltip]="'Excluir ' + complemento"
    class="material-icons md-24"
    >delete</mat-icon
  >`
})
export class DeleteButtonComponent implements OnInit {
  @Output()
  deleteEmitter = new EventEmitter();

  @Input()
  complemento: string;

  @Input()
  id: number;

  ngOnInit(): void {
  }

  delete() {
    this.deleteEmitter.emit(this.id);
  }

}
