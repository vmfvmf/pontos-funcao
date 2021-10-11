import { LoaderSpinnerService } from "./Components/loader-spinner/loader-spinner.service";
import { LoaderSpinnerComponent } from "./Components/loader-spinner/loader-spinner.component";
import { DeleteButtonComponent } from "./Components/delete-button.component";
import { ComponentesModule } from "pje-componentes";
import { NgModule } from "@angular/core";
import { EditButtonComponent } from "./Components/edit-button.component";
import { NewButtonComponent } from "./Components/new-button.component";

@NgModule({
  imports: [ComponentesModule],
  providers: [LoaderSpinnerService],
  declarations: [
    EditButtonComponent,
    NewButtonComponent,
    DeleteButtonComponent,
    LoaderSpinnerComponent,
  ],
  exports: [
    EditButtonComponent,
    NewButtonComponent,
    DeleteButtonComponent,
    LoaderSpinnerComponent,
  ],
})
export class SharedModule {}
