import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentmethodDialogComponent } from './addpaymentmethod-dialog.component';

describe('AddpaymentmethodDialogComponent', () => {
  let component: AddpaymentmethodDialogComponent;
  let fixture: ComponentFixture<AddpaymentmethodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpaymentmethodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpaymentmethodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
