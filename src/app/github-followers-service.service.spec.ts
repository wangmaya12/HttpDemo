import { TestBed } from '@angular/core/testing';

import { GithubFollowersServiceService } from './github-followers-service.service';

describe('GithubFollowersServiceService', () => {
  let service: GithubFollowersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubFollowersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
