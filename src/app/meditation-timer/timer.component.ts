import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  animations: [
    trigger('breathingCircle', [
      state('expand',
        style({
          transform: 'scale( 1 )',
          // height: '45px',
          // width: '45px',
      })),
      state('contract',
        style({
          transform: 'scale( 1.8 )',
          // height: '25px',
          // width: '25px'
        })),
      transition('* <=> *', animate('{{time}}s'))
    ])
  ]
})
export class TimerComponent implements OnInit {
  timer; // the timeout object
  currentTime = 0; // the currentTime is in 10ths of a second
  state = 'expand';
  totalTime = .25;
  time;
  running = false; // Whether or not the timer is running
  timeString;
  minutes = 0;
  seconds = 0;
  breathTimeSetting = 5;
  breathCount = 0;
  finished = false;
  results = false;
  constructor() {
  }
  toggleBreathingCircle() {
    this.state = this.state === 'contract' ? 'expand' : 'contract';
  }
  pauseTimer() {
    clearTimeout(this.timer);
  }

  startTimer() {
    this.timer = setTimeout(() => {
      const breathTimer = this.currentTime % this.breathTimeSetting;
      if ((breathTimer > 0 && breathTimer < .1)) {
          this.toggleBreathingCircle();
          this.breathCount++;
      }
      if (this.time >= 75) {
        clearTimeout(this.timer);
        this.finished = true;
        return;
      }
      this.currentTime += .1;
      this.minutes = Math.floor(this.currentTime / 60);
      this.seconds = this.currentTime - this.minutes * 60;
      const percentage_of_total_time = this.currentTime / (this.totalTime * 60);
      this.time = (percentage_of_total_time * 100) * .75;
      this.startTimer();
    }, 100);
  }

  ngOnInit() {
  }

}
