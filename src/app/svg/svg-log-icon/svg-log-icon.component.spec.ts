/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SvgLogIconComponent } from './svg-log-icon.component';

describe('LogIconComponent', () => {
  let component: SvgLogIconComponent;
  let fixture: ComponentFixture<SvgLogIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgLogIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgLogIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
