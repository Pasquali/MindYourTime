import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  defaultState = {
    formattedTime: '0:00',
    timerPosition: 0,
    finished: false,
    sessionLength: 5,
    breathTimeSetting: 5
  };
  private timerObject$ = new BehaviorSubject<Object>(this.defaultState);

  secondCount = 0;
  seconds = 0;
  minutes = 0;

  currentTime = 0;
  recordedSeconds = 0;
  sessionLength = 5;
  breathCount = 0;
  currentTimerObject;
  uploadId;
  timer;

  constructor(private data: DataService) {
    this.getTimerObject()
        .subscribe(timerObject => this.currentTimerObject = timerObject);
  }
  pause(): void {
    clearTimeout(this.timer);
    this.uploadTime();
  }
  start(): void {
    this.timer = setTimeout(() =>
      this.incrementTimerVariables(), 100);
  }

  incrementTimerVariables() {
    let finished = false;
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

    const breathTimer = this.currentTime % this.currentTimerObject.breathTimeSetting;
    // increment breath counters
    if ((breathTimer > 0 && breathTimer < .1)) {
        this.breathCount++;
    }


    const percentageOfTotalTime = this.currentTime / (this.currentTimerObject.sessionLength * 60);
    const timerPosition = (percentageOfTotalTime * 100) * .75;

    if (percentageOfTotalTime >= 1 ) {
      finished = true;
      this.pause();
    } else {
      this.start();
    }

    this.timerObject$.next({
      ...this.currentTimerObject,
      formattedTime: this.minutes + ':' + ('00' + this.seconds).slice(-2),
      timerPosition: timerPosition,
      finished: finished
    });

  }

  getTimerObject() {
    return this.timerObject$;
  }

  setSessionLength(length: number) {
    this.timerObject$.next({...this.currentTimerObject, sessionLength: length});
  }
  setBreathLength(length: number) {
    this.timerObject$.next({...this.currentTimerObject, breathTimeSetting: length});
  }
  uploadTime() {
    this.data.uploadTime(this.recordedSeconds, this.breathCount, this.uploadId)
      .subscribe(res => {
          this.uploadId = res.id;
      });
  }

}
