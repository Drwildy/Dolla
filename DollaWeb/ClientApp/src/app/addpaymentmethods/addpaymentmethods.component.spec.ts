import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentMethodsComponent} from './addpaymentmethods.component';

describe('AddPaymentMethodsComponent', () => {
  let component: AddPaymentMethodsComponent;
  let fixture: ComponentFixture<AddPaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
