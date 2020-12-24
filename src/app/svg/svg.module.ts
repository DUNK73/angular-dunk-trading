import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgCalculationIconComponentModule } from './svg-calculation-icon/svg-calculation-icon.module';
import { SvgInformationIconComponentModule } from './svg-information-icon/svg-information-icon.module';
import { SvgLogIconComponentModule } from './svg-log-icon/svg-calculation-icon.module';
import { SvgGlassesIconComponentModule } from './svg-glasses-icon/svg-glasses-icon.module';

let modules = [
  SvgLogIconComponentModule,
  SvgCalculationIconComponentModule,
  SvgInformationIconComponentModule,
  SvgGlassesIconComponentModule,
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
