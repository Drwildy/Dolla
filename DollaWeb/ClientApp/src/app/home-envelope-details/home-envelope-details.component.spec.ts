import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnvelopeDetailsComponent } from './home-envelope-details.component';

describe('HomeEnvelopeDetailsComponent', () => {
  let component: HomeEnvelopeDetailsComponent;
  let fixture: ComponentFixture<HomeEnvelopeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEnvelopeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEnvelopeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
