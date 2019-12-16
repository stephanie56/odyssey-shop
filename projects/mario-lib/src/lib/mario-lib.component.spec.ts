import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarioLibComponent } from './mario-lib.component';

describe('MarioLibComponent', () => {
  let component: MarioLibComponent;
  let fixture: ComponentFixture<MarioLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarioLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarioLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
