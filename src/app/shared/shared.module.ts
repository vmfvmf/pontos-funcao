import { FormValidationFocusInvalidInputDirective } from './Directives/form-validation-error-focus.directive';
import { CloseCancelButtonComponent } from './Components/close-cancel-button.component';
import { ViewButtonComponent } from './Components/view-button.component';
import { ReadOnlyDirective } from './Directives/read-only.directive';
import { CommonModule } from '@angular/common';
import { DataTableModule } from './Components/data-table/data-table.module';
import { PaginadorModule } from './Components/paginador/paginador.module';
import { MessageService } from './Service/message.service';
import { AngularMaterialModule } from './../material.module';
import { LoaderSpinnerService } from "./Components/loader-spinner/loader-spinner.service";
import { LoaderSpinnerComponent } from "./Components/loader-spinner/loader-spinner.component";
import { DeleteButtonComponent } from "./Components/delete-button.component";
import { NgModule } from "@angular/core";
import { EditButtonComponent } from "./Components/edit-button.component";
import { NewButtonComponent } from "./Components/new-button.component";

@NgModule({
  imports: [AngularMaterialModule, CommonModule ],
  providers: [LoaderSpinnerService, MessageService],
  declarations: [
    CloseCancelButtonComponent,
    ViewButtonComponent,
    EditButtonComponent,
    NewButtonComponent,
    DeleteButtonComponent,
    LoaderSpinnerComponent,
    ReadOnlyDirective,
    FormValidationFocusInvalidInputDirective
  ],
  exports: [
    CloseCancelButtonComponent,
    ViewButtonComponent,
    EditButtonComponent,
    NewButtonComponent,
    DeleteButtonComponent,
    LoaderSpinnerComponent,
    DataTableModule,
    PaginadorModule,
    ReadOnlyDirective,
    FormValidationFocusInvalidInputDirective
  ],
})
export class SharedModule {}
