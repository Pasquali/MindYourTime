import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import { Observable } from 'rxjs';
import { Stats } from '../../shared/models/stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  statObject: Observable<Stats>;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.statObject = this.data.getTotalValues();
  }

}
