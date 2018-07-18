import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterViewInit {
  @ViewChild('el') el: ElementRef;
  timer; // the timeout object
  currentTime = 0; // the currentTime is in 10ths of a second
  totalTime = 5;
  time;
  running = false; // Whether or not the timer is running
  minutes = 0;
  seconds = 0;
  breathTimeSetting = 5;
  breathCount = 0;
  finished = false;
  results = false;
  state = 0;
  currentScale = 1;
  targetScale = 1.8;

  private player;

  constructor(private builder: AnimationBuilder, private data: DataService) { }

  private animate() {
    const factory = this.builder.build([
      style({transform: `scale( ${this.currentScale} )`}),
      animate(this.breathTimeSetting * 1000, style({transform: `scale( ${this.targetScale} )`}))
    ]);

    this.player = factory.create(this.el.nativeElement, {});

    this.player.onDone(() => {
      const temp = this.currentScale;
      this.currentScale = this.targetScale;
      this.targetScale = temp;
      this.animate();
      this.player.play();
    });

  }
  changeBreath(setting) {
    this.breathTimeSetting = setting.value;
  }
  changeTime(setting) {
    this.totalTime = setting.value;
  }
  pauseTimer() {
    clearTimeout(this.timer);
  }

  startTimer() {
    this.timer = setTimeout(() => {
      const breathTimer = this.currentTime % this.breathTimeSetting;
      if ((breathTimer > 0 && breathTimer < .1)) {
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
  uploadTime(user_id, time, breaths) {
    this.data.uploadTime(user_id, time, breaths)
      .subscribe(res => console.log(res));
  }
  ngAfterViewInit() {
    this.animate();
  }

}
