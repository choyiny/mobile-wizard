import { TestBed } from '@angular/core/testing';

import { HostPeerService } from './host-peer.service';

describe('HostPeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostPeerService = TestBed.get(HostPeerService);
    expect(service).toBeTruthy();
  });
});
