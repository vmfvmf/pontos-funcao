import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-new-button',
  template: `
  <mat-icon
    style="cursor: pointer; color: mediumaquamarine"
    (click)="add()"
    [matTooltip]="'Criar ' + complemento"
    class="material-icons md-24"
    >create_new_folder</mat-icon
  >`
})
export class NewButtonComponent implements OnInit {
  @Output()
  newEmitter = new EventEmitter();

  @Input()
  complemento: string;

  ngOnInit(): void {
  }

  add() {
    this.newEmitter.emit();
  }

}
