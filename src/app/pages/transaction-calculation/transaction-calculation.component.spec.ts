import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCalculationComponent } from './transaction-calculation.component';

describe('TransactionCalculationComponent', () => {
  let component: TransactionCalculationComponent;
  let fixture: ComponentFixture<TransactionCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
