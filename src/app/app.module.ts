import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { OperationResultComponent } from "./components/operation-result/operation-result.component";

import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { HttpClient, HttpClientModule } from '@angular/common/http';
registerLocaleData(localeRu, "ru");

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AppComponent, HelloComponent, OperationResultComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "ru",
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
