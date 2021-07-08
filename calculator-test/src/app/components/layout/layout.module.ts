import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { LayoutComponent } from "./layout.component";
import { CreditContainerModule } from "../credit-container/credit-container.module";
import { RangeContainerModule } from "../range-container/range-container.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [BrowserModule, CreditContainerModule, RangeContainerModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
