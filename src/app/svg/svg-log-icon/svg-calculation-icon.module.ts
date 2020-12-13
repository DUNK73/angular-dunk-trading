import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgLogIconComponent } from './svg-log-icon.component';



@NgModule({
  declarations: [
      SvgLogIconComponent
   ],
  imports: [
    CommonModule
  ],
  exports: [
    SvgLogIconComponent
  ]
})
export class SvgLogIconComponentModule { }
