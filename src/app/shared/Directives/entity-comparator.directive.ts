import {
  Directive,
  HostBinding,
  Input,
} from "@angular/core";

@Directive({
  selector: "[vmf-compares]",
})
export class InputCompares {
  @Input("vmf-compares")
  pair: {v1: string, v2: string} = {v1: "", v2: ""};

  @HostBinding('class')
  elementClass = this.pair.v1 === this.pair.v2 ? '' : 'versao-editada';

  constructor() {
  }
}
