import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBillsComponent } from './home-bills.component';

describe('HomeBillsComponent', () => {
  let component: HomeBillsComponent;
  let fixture: ComponentFixture<HomeBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
