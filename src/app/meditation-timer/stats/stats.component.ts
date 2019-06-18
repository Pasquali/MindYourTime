import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {
  totalTime;
  totalBreaths;
  breathPointsPerDay;
  ready = false;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getTotalValues()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.totalTime = res.totalTime;
        this.totalBreaths = res.totalBreaths;
        this.breathPointsPerDay = res.breathPointsPerDay;
        this.ready = true;
      });
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
