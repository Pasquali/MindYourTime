import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  sessionBreaths: Number;
  sessionTime: any;
  totalTime;
  totalBreaths;

  constructor(private route: ActivatedRoute, private data: DataService) {
    data.getTotalValues()
    .subscribe(res => {
      console.log(res);
      this.totalTime = res.totalTime;
      this.totalBreaths = res.totalBreaths;
    });
  }

  ngOnInit() {
  }

}
