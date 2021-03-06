import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AnimationBuilder, animate, style } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('errorText') errorText: ElementRef;
  error = '';
  private player;
  currentOpacity = '0';
  targetOpacity = '1';
  blinkCount = 0;

  loginForm: FormGroup;
  showSpinner = false;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private auth: AuthService, public router: Router, private fb: FormBuilder,
    private builder: AnimationBuilder) {
    this.loginForm = this.fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
    router.navigate(['/timer']);
  }

  private animate() {
    const factory = this.builder.build([
      style({opacity: this.currentOpacity}),
      animate(700, style({opacity: this.targetOpacity}))
    ]);

    this.player = factory.create(this.errorText.nativeElement, {});

    this.player.onDone(() => {
      const temp = this.currentOpacity;
      this.currentOpacity = this.targetOpacity;
      this.targetOpacity = temp;
      this.animate();
      this.blinkCount++;
      if (this.blinkCount >= 2) {
        this.blinkCount = 0;
        this.player.pause();
      } else {
        this.player.play();
      }
    });
  }

  login(credentials) {
    this.showSpinner = true;
    this.auth.login(credentials)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.showSpinner = false;
        if (res.auth) {
          this.router.navigate(['/timer']);
        } else {
          this.error = res.error;
          this.player.play();
        }
    });
  }
  ngAfterViewInit() {
    this.animate();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
