import { TestBed } from '@angular/core/testing';

import { MarioLibService } from './mario-lib.service';

describe('MarioLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarioLibService = TestBed.get(MarioLibService);
    expect(service).toBeTruthy();
  });
});
