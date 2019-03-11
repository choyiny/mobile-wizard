import { TestBed } from '@angular/core/testing';

import { PlayerPeerService } from './player-peer.service';

describe('PlayerPeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerPeerService = TestBed.get(PlayerPeerService);
    expect(service).toBeTruthy();
  });
});
