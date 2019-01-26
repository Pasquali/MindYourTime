import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private data: DataService) {
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
