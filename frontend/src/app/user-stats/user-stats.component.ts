import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WizardAPIService} from '../external/wizard-api.service';
import {DeviceService} from '../helpers/device.service';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'wizard-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

  public username = 'I dunno';
  public most_damage = 0;
  public most_defense = 0;
  public fastest_game = 'no record';

  constructor(
    private authService: AuthService,
    private apiService: WizardAPIService,
    private ref: ChangeDetectorRef) {

    // User's ifo
    this.apiService.getUserProfile().subscribe((user) => {
      if (user['nickname'] !== '') {
        this.username = user['nickname'];
      }
      this.ref.detectChanges();
    });
    this.apiService.getUserStats().subscribe((data) => {
      this.fastest_game = data['fastest_game'];
      this.most_damage = data['most_damage'];
      this.most_defense = data['most_damage_blocked'];
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
  }

}
