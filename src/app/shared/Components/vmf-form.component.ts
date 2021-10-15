import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "vmf-form",
  template: `
    <form
      validateFocusInvalidInput
      id="ngForm"
      #f="ngForm"
      [vmf-read-only]="true"
    >
      <ng-template
        *ngFor="let content of children"
        [ngTemplateOutlet]="content"
      >
      </ng-template>
    </form>
  `,
})
export class VmfFormComponent implements OnInit {
  @ContentChildren(TemplateRef) children: TemplateRef<any>;

  ngOnInit(): void {
    alert('teste');
  }


}
