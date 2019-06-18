import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stats } from '../../shared/models/stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {
  ready = false;
  statObject: Stats;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getTotalValues()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.statObject = res;
        this.ready = true;
      });
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
