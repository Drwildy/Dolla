import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMoneyboxComponent } from './budget-moneybox.component';

describe('BudgetMoneyboxComponent', () => {
  let component: BudgetMoneyboxComponent;
  let fixture: ComponentFixture<BudgetMoneyboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetMoneyboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMoneyboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
