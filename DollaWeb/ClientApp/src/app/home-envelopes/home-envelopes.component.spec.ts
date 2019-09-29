import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnvelopesComponent } from './home-envelopes.component';

describe('HomeEnvelopesComponent', () => {
  let component: HomeEnvelopesComponent;
  let fixture: ComponentFixture<HomeEnvelopesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEnvelopesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEnvelopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
