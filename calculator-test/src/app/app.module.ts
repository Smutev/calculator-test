import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";

registerLocaleData(localeRu);

import { AppComponent } from "./app.component";
import { LayoutModule } from "./components/layout/layout.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LayoutModule],
  providers: [{ provide: LOCALE_ID, useValue: "ru" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
