import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: 'form[validateFocusInvalidInput]'
})
export class FormValidationFocusInvalidInputDirective {
  constructor(private el: ElementRef, private ngForm: NgForm) {}

  @HostListener('ngSubmit', ['$event.target'])
  onSubmit(): void {
    if (!this.ngForm.valid) {
      let controlComErro;
      for (const key of Object.keys(this.ngForm.controls)) {
        this.ngForm.controls[key].markAsTouched();
        this.ngForm.controls[key].disable();
        if (this.ngForm.controls[key].hasError('required') && !controlComErro) {
          controlComErro = key;
        }
      }
      this.el.nativeElement.scrollIntoView();
      this.el.nativeElement.querySelector('[name="' + controlComErro + '"]').focus();
    }
  }
}
