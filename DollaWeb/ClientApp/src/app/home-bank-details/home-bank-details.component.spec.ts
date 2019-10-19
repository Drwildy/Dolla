import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBankDetailsComponent } from './home-bank-details.component';

describe('HomeBankDetailsComponent', () => {
  let component: HomeBankDetailsComponent;
  let fixture: ComponentFixture<HomeBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
