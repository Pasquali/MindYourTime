import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { DataService } from '../services/data.service';
import {TimerService} from '../services/timer.service';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('el') el: ElementRef;
  timer; // the timer object
  sessionLength = 5;
  breathTimeSetting = 5; // length of inhale/exhale in seconds
  running = false; // Whether or not the timer is running
  finished = false;
  results = false;
  currentScale = 1; // used for the current scale setting of the breathing circle
  targetScale = 1.8; // what the scale will be at the end of the animation
  player;
  timerObject: Observable<any>;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private builder: AnimationBuilder, private timerService: TimerService) {
    this.timer = this.timerService;
    this.timerObject = this.timer.getTimerObject();
    this.timerObject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res.finished) {
          this.player.pause();
          this.finished = true;
          return;
        }
      });
  }

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
    this.timer.setBreathLength(setting.value);
  }
  changeTime(setting) {
    this.sessionLength = setting.value;
    this.timer.setSessionLength(setting.value);
  }
  ngAfterViewInit() {
    this.animate();
  }
  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
