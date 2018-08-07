import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  sessionBreaths: number;
  sessionTime: any;

  constructor(private route: ActivatedRoute, private data: DataService) {
    data.getTotalTime()
    .subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

}
