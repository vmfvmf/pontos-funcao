import { ChangeDetectorRef, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: '[vmf-read-only]'
})
export class ReadOnlyDirective {
  @Input('vmf-read-only')
  isReadOnly: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    let inputs = this.el.nativeElement.querySelectorAll('input, button');
    inputs.forEach(input => {
      input.disabled = this.isReadOnly;
      if (input.localName === 'button') {
        input.style.display = 'none';
      }
    });

  }
}
