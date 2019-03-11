import { TestBed } from '@angular/core/testing';

import { WizardAPIService } from './wizard-api.service';

describe('WizardAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardAPIService = TestBed.get(WizardAPIService);
    expect(service).toBeTruthy();
  });
});
