import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer-progress',
  templateUrl: './timer-progress.component.html',
  styleUrls: ['./timer-progress.component.css']
})
export class TimerProgressComponent implements OnInit {
  @Input()
    set time(time) {
      this.value = time;
      if (time < 75) {
        this.value = time;
      } else {
        time = 75;
      }
    }
  mode = 'determinate';
  value = 0;

  constructor() {
   }

  ngOnInit() {
  }

}
