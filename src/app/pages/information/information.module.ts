import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';


const routes: Routes = [
  { path: '', component: InformationComponent }
];

@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InformationModule { }
