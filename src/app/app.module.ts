import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { OperationResultComponent } from "./components/operation-result/operation-result.component";

import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
registerLocaleData(localeRu, "ru");

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, HelloComponent, OperationResultComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "ru",
      providers: []
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
