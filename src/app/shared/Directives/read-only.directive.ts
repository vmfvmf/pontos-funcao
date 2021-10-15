import { ArquivoReferenciadoCadastroComponent } from "./../../contagem/cadastro/arquivo-referenciado/cadastro/cadastro.component";
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";
import { NgForm } from "@angular/forms";

@Directive({
  selector: "form[vmf-read-only]",
})
export class ReadOnlyDirective {
  @Input("vmf-read-only")
  isReadOnly: boolean;

  @Input("vmf-read-only-ignores")
  ignores: string[] = [];

  @Input("vmf-read-only-hide")
  containersToHide: string[] = [];

  constructor(private el: ElementRef, private ngForm: NgForm) {}

  ngAfterContentChecked(): void {
    if (this.isReadOnly) {
      for (const key of Object.keys(this.ngForm.controls)) {
        if (key && !this.ignores.includes(key))
          this.ngForm.controls[key].disable();
      }
      this.el.nativeElement.querySelectorAll("button").forEach((element) => {
        if (element.name !== "close-cancel-button" && !this.ignores.includes(element.name)) {
          element.style.display = "none";
        }
      });
      this.containersToHide.forEach((elName) => {
        this.el.nativeElement
          .querySelectorAll('[name="' + elName + '"]')
          .forEach((element) => {
            element.style.display = "none";
          });
      });
    } else {
      for (const key of Object.keys(this.ngForm.controls)) {
        if (key && !this.ignores.includes(key))
          this.ngForm.controls[key].enable();
      }
      this.el.nativeElement.querySelectorAll("button").forEach((element) => {
        if (element.name !== "close-cancel-button" && !this.ignores.includes(element.name)) {
          element.style.display = "inline";
        }
      });
      this.containersToHide.forEach((elName) => {
        this.el.nativeElement
          .querySelectorAll('[name="' + elName + '"]')
          .forEach((element) => {
            element.style.display = "inline";
          });
      });
    }
  }
}
