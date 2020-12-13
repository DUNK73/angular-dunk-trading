/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SvgCalculationIconComponent } from './svg-calculation-icon.component';

describe('CalculationIconComponent', () => {
  let component: SvgCalculationIconComponent;
  let fixture: ComponentFixture<SvgCalculationIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCalculationIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCalculationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
