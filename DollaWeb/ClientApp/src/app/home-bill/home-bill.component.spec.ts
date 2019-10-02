import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBillComponent } from './home-bill.component';

describe('HomeBillComponent', () => {
  let component: HomeBillComponent;
  let fixture: ComponentFixture<HomeBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
