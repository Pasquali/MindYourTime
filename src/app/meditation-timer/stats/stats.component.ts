import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  totalTime;
  totalBreaths;
  breathPointsPerDay;
  ready = false;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.getTotalValues()
    .subscribe(res => {
      this.totalTime = res.totalTime;
      this.totalBreaths = res.totalBreaths;
      this.breathPointsPerDay = res.breathPointsPerDay;
      this.ready = true;
    });
  }

}
