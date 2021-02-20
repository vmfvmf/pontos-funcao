import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SprintCadastroComponent } from './cadastro.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ],
  declarations: [SprintCadastroComponent],
  exports: [SprintCadastroComponent]
})
export class SprintCadastroModule {}
