import { TestBed } from '@angular/core/testing';

import { UserInterActionService } from './user-inter-action.service';

describe('UserInterActionService', () => {
  let service: UserInterActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInterActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
