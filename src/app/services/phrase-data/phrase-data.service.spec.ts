import { TestBed } from '@angular/core/testing';

import { PhraseDataService } from './phrase-data.service';

describe('PhraseDataService', () => {
  let service: PhraseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhraseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
