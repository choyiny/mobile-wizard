import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLobbyComponent } from './room-lobby.component';

describe('RoomLobbyComponent', () => {
  let component: RoomLobbyComponent;
  let fixture: ComponentFixture<RoomLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
