import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-view-button',
  template: `
  <mat-icon
    style="cursor: pointer;"
    (click)="view()"
    [matTooltip]="'Visualizar ' + complemento"
    class="material-icons-outlined md-24"
    >visibility</mat-icon
  >`
})
export class ViewButtonComponent implements OnInit {
  @Output()
  viewEmitter = new EventEmitter();

  @Input()
  complemento: string;

  @Input()
  objeto: any;

  ngOnInit(): void {
  }

  view() {
    this.viewEmitter.emit(this.objeto);
  }

}
