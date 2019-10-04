import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentmethodsComponent } from './addpaymentmethods.component';

describe('AddpaymentmethodsComponent', () => {
  let component: AddpaymentmethodsComponent;
  let fixture: ComponentFixture<AddpaymentmethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpaymentmethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpaymentmethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
