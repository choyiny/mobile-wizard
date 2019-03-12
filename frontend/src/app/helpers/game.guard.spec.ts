import { TestBed, async, inject } from '@angular/core/testing';

import { GameGuard } from './game.guard';

describe('GameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameGuard]
    });
  });

  it('should ...', inject([GameGuard], (guard: GameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
