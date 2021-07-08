import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CreditContainerComponent } from "./credit-container.component";
import { ButtonModule } from "../button/button.module";
import { PromocodeButtonComponent } from "./promocode-button/promocode-button.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [CreditContainerComponent, PromocodeButtonComponent],
  imports: [BrowserModule, ButtonModule, SharedModule],
  exports: [CreditContainerComponent]
})
export class CreditContainerModule {}
