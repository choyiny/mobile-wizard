import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GamestatsService} from './gamestats.service';
import {Router} from '@angular/router';

@Component({
  selector: 'wizard-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {

  constructor(public gamestats: GamestatsService,
              private router: Router,
              private ref: ChangeDetectorRef) {
    console.log(gamestats);
  }

  ngOnInit() {
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.gamestats.reset();
  }

  backHome() {
    this.router.navigate(['/home']);
  }

}
