import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordValidation } from './password-validation';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('errorText') errorText: ElementRef;
  error = '';
  private player;
  currentOpacity = '0';
  targetOpacity = '1';
  blinkCount = 0;

  showSpinner = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private builder: AnimationBuilder) {
    this.registerForm = fb.group({
      'first_name' : [null, Validators.required],
      'last_name' : [null, Validators.required],
      'company' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
      'confirm_password' : [null, Validators.required],
    }, {
      validator: PasswordValidation.MatchPassword
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
  register(formValue) {
    this.showSpinner = true;
    this.auth.registerUser(formValue)
      .subscribe(res => {
        this.showSpinner = false;
        if (res.error) {
          this.error = res.error;
          this.player.play();
        }
      });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.animate();
  }

}
