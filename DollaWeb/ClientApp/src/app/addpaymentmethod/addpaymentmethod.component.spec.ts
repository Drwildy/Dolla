import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentmethodComponent } from './addpaymentmethod.component';

describe('AddpaymentmethodComponent', () => {
  let component: AddpaymentmethodComponent;
  let fixture: ComponentFixture<AddpaymentmethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpaymentmethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpaymentmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
