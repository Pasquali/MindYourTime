import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer;
  time = 0;
  constructor() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.time += .1;
      this.startTimer();
    }, 100);
  }

  ngOnInit() {
  }

}
