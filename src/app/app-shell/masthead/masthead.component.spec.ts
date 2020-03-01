import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastheadComponent } from './masthead.component';

describe('MastheadComponent', () => {
  let component: MastheadComponent;
  let fixture: ComponentFixture<MastheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MastheadComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Mario Odyssey Shop'`, () => {
    const fixture = TestBed.createComponent(MastheadComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Mario Odyssey Shop');
  });
});
