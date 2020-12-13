import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TransactionLogComponent } from './pages/transaction-log/transaction-log.component';




const routes: Routes = [
  { path: 'transaction-calculation', loadChildren: () => import('./pages/transaction-calculation/transaction-calculation.module').then(m => m.TransactionCalculationModule) },
  { path: 'transaction-log', loadChildren: () => import('./pages/transaction-log/transaction-log.module').then(m => m.TransactionLogModule) },
  // { path: 'path', component: TransactionLogComponent },
  // { path: '', redirectTo: 'transaction-calculation', pathMatch: 'full' },
  { path: '**', redirectTo: 'transaction-calculation', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

