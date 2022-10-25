import { TestBed } from '@angular/core/testing';

import { OrgserviceService } from './orgservice.service';

describe('OrgserviceService', () => {
  let service: OrgserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
