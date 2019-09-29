import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBanksComponent } from './home-banks.component';

describe('HomeBanksComponent', () => {
  let component: HomeBanksComponent;
  let fixture: ComponentFixture<HomeBanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
