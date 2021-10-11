import { Component, Input } from '@angular/core';
import { BehaviorSubject ,  Subscription } from 'rxjs';
import { LoaderSpinnerService } from './loader-spinner.service';

@Component({
  selector: 'exe-app-loader-spinner',
  template: `
  <div class="spinner-overlay" *ngIf="isLoading | async">
    <mat-progress-spinner class="spinner"
        [color]="color"
        [diameter]="diameter"
        mode="indeterminate">
    </mat-progress-spinner>
  </div>`,
  styleUrls: ['./loader-spinner.component.css']
})
export class LoaderSpinnerComponent {
  @Input()
  color = 'primary';

  @Input()
  diameter = 50;

  // isLoading: boolean;
  subscription: Subscription;

  isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderSpinnerService) {}
}
