import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgCalculationIconComponentModule } from './svg-calculation-icon/svg-calculation-icon.module';
import { SvgLogIconComponentModule } from './svg-log-icon/svg-calculation-icon.module';

let modules = [
  SvgLogIconComponentModule,
  SvgCalculationIconComponentModule
];


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [
    ...modules,
  ]
})
export class SvgModule { }
