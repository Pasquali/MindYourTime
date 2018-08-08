import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('errorText') errorText: ElementRef;

  loginForm: FormGroup;
  showSpinner = false;
  error = '';
  private player;
  currentOpacity = '0';
  targetOpacity = '1';
  blinkCount = 0;
  constructor(private auth: AuthService, public router: Router, private fb: FormBuilder,
    private builder: AnimationBuilder) {
  this.loginForm = fb.group({
    'email' : [null, Validators.required],
    'password' : [null, Validators.required],
  });
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
      .subscribe(res => {
        this.showSpinner = false;
        console.log(res);
        if (res.auth) {
          this.router.navigate(['/timer']);
        } else {
          this.error = res.error;
          this.player.play();
        }
    });
    // .subscribe(response => {
    //   console.log(response);
    //   const data: any = response;
    //   this.showSpinner = false;
    //   if (data.ok) {
    //     this.Auth.loginStream.next(true);
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.error = data;
    //   }
  // });
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.animate();
  }

}
