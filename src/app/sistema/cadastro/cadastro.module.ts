import { SistemaCadastroComponent } from './cadastro.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [SistemaCadastroComponent],
  exports: [SistemaCadastroComponent]
})
export class SistemaCadastroModule {}
