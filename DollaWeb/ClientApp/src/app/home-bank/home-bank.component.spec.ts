import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBankComponent } from './home-bank.component';

describe('HomeBankComponent', () => {
  let component: HomeBankComponent;
  let fixture: ComponentFixture<HomeBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
