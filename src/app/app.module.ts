import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule, Routes } from '@angular/router';
import { TransactionLogComponent } from './pages/transaction-log/transaction-log.component';
import { OperationResult } from './types/OperationResult';
import { SvgModule } from './svg/svg.module';
registerLocaleData(localeRu, "ru");

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'transaction-log', loadChildren: () => import('./pages/transaction-log/transaction-log.module').then(m => m.TransactionLogModule) },
  { path: 'path', component: OperationResult },
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'transaction-calculation', loadChildren: () => import('./pages/transaction-calculation/transaction-calculation.module').then(m => m.TransactionCalculationModule) },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes)
    SvgModule
  ],
  declarations: [AppComponent],
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
