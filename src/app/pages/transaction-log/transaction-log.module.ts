import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TransactionLogComponent } from './transaction-log.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '', component: TransactionLogComponent,
    children: [
      { path: '', component: TransactionsComponent },
      { path: ':id', component: TransactionComponent },
    ]
  }
];

@NgModule({
  declarations: [TransactionLogComponent, TransactionsComponent, TransactionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionLogModule { }
