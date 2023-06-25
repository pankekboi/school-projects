import { TestBed } from '@angular/core/testing';

import { EnterpriseTablesService } from './enterprise-tables.service';

describe('EnterpriseTablesService', () => {
  let service: EnterpriseTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterpriseTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
