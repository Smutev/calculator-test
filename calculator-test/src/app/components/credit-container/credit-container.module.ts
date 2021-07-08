import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {CreditContainerComponent} from "./credit-container.component";
import {ButtonModule} from "../button/button.module";

@NgModule({
  declarations: [CreditContainerComponent],
  imports: [BrowserModule, ButtonModule],
  exports: [CreditContainerComponent]
})

export class CreditContainerModule {}
