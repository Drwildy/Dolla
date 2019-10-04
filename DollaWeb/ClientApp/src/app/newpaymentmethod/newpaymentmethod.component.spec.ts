import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpaymentmethodComponent } from './newpaymentmethod.component';

describe('NewpaymentmethodComponent', () => {
  let component: NewpaymentmethodComponent;
  let fixture: ComponentFixture<NewpaymentmethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpaymentmethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpaymentmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
