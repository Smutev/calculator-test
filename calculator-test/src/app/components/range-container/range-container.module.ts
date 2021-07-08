import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { RangeContainerComponent } from "./range-container.component";
import { RangeSelectorComponent } from "./range-selector/range-selector.component";
import { ButtonModule } from "../button/button.module";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RangeContainerComponent, RangeSelectorComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RangeContainerComponent]
})
export class RangeContainerModule {}
