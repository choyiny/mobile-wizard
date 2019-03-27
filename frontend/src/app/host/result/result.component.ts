import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GamestatsService} from './gamestats.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'wizard-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {

  constructor(public gamestats: GamestatsService,
              private router: Router,
              private ref: ChangeDetectorRef) {
    of(true).pipe(
      delay(10),
      tap(() => this.ref.detectChanges())
    ).subscribe(() => {});
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.gamestats.reset();
  }

  public backHome() {
    this.router.navigate(['/home']);
  }

}
