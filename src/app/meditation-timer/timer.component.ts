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
  uploadId;
  currentTime = 0; // the currentTime is in 10ths of a second
  sessionLength = 5;
  timerPosition; // position on material timer
  running = false; // Whether or not the timer is running
  minutes = 0; // used to display a
  seconds = 0;
  recordedSeconds = 0; // resets after upload
  recordedBreathCount = 0; // resets after upload
  breathTimeSetting = 5; // length of inhale/exhale in seconds
  breathCount = 0;
  finished = false;
  results = false;
  currentScale = 1; // used for the current scale setting of the breathing circle
  targetScale = 1.8; // what the scale will be at the end of the animation
  secondCount = 0; // counts 1 for each .1 of a second once it hit 10 it increments the seconds variable
  initalUpload = true;
  player;

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
    this.sessionLength = setting.value;
  }
  pauseTimer() {
    clearTimeout(this.timer);
  }
  startTimer() {
    this.timer = setTimeout(() => {
      const breathTimer = this.currentTime % this.breathTimeSetting;
      // increment breath counters
      if ((breathTimer > 0 && breathTimer < .1)) {
          this.breathCount++;
          this.recordedBreathCount++;
      }
      // stop the timer if time is up
      if (this.timerPosition >= 75) {
        clearTimeout(this.timer);
        this.player.pause();
        this.finished = true;
        return;
      }
      this.incrementTimerVariables();
    }, 100);
  }
  incrementTimerVariables() {
    this.secondCount++;
    if (this.secondCount % 10 === 0) {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }
    // current milisecond of the itmer
    this.currentTime += .1;
    // recorded milisecond since last push to server
    this.recordedSeconds += .1;
    const percentageOfTotalTime = this.currentTime / (this.sessionLength * 60);
    this.timerPosition = (percentageOfTotalTime * 100) * .75;
    this.startTimer();
  }
  uploadTime() {
    this.data.uploadTime(this.recordedSeconds, this.recordedBreathCount, this.uploadId)
      .subscribe(res => {
          this.uploadId = res.id;
      });
  }
  ngAfterViewInit() {
    this.animate();
  }
}
