import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnvelopeComponent } from './home-envelope.component';

describe('HomeEnvelopeComponent', () => {
  let component: HomeEnvelopeComponent;
  let fixture: ComponentFixture<HomeEnvelopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEnvelopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
