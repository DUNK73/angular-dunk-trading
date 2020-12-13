import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TransactionCalculationComponent } from './transaction-calculation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationResultComponent } from './operation-result/operation-result.component';


const routes: Routes = [
  { path: '', component: TransactionCalculationComponent }
];

@NgModule({
  declarations: [
    TransactionCalculationComponent,
    OperationResultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionCalculationModule { }
