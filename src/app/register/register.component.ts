import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { PasswordValidation } from './password-validation';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('errorText') errorText: ElementRef;
  error = '';
  player;
  currentOpacity = '0';
  targetOpacity = '1';
  blinkCount = 0;
  playing = false;
  showSpinner = false;
  formObject = {
    formGroup: 'registerForm',
    formControlArray: [
      {
        style: '50%',
        placeholder: 'First Name',
        formControlName: 'first_name'
      },
      {
        style: '50%',
        placeholder: 'Last Name',
        formControlName: 'last_name'
      }
      ,
      {
        style: '100%',
        placeholder: 'Company',
        formControlName: 'company'
      }
      ,
      {
        style: '100%',
        placeholder: 'Email Address',
        formControlName: 'email',
        type: 'email'
      }
      ,
      {
        style: '50%',
        placeholder: 'Password',
        formControlName: 'password',
        type: 'password'
      }
      ,
      {
        style: '50%',
        placeholder: 'Confirm Password',
        formControlName: 'confirm_password',
        type: 'password'
      }
    ]
  };
  registerForm = this.fb.group({
    'first_name' : [null, Validators.required],
    'last_name' : [null, Validators.required],
    'company' : [null, Validators.required],
    'email' : [null, [Validators.required, Validators.email]],
    'password' : [null, Validators.required],
    'confirm_password' : [null, Validators.required],
    }, {
    validator: PasswordValidation.MatchPassword
  });
  constructor(private fb: FormBuilder, private auth: AuthService,
    private builder: AnimationBuilder, private router: Router) {}

  private animate() {
    const factory = this.builder.build([
      style({opacity: this.currentOpacity}),
      animate(700, style({opacity: this.targetOpacity}))
    ]);

    this.player = factory.create(this.errorText.nativeElement, {});
    this.player.onStart(() => {
      this.playing = true;
    });
    this.player.onDone(() => {
      const temp = this.currentOpacity;
      this.currentOpacity = this.targetOpacity;
      this.targetOpacity = temp;
      this.animate();
      this.blinkCount++;
      if (this.blinkCount >= 2) {
        this.blinkCount = 0;
        this.player.pause();
        this.playing = false;
      } else {
        this.player.play();
      }
    });
  }
  submit(formValue) {
    this.showSpinner = true;
    this.auth.registerUser(formValue)
      .subscribe(res => {
        this.showSpinner = false;
        if (res.error) {
          this.error = res.error;
          this.player.play();
        } else if (res.auth) {
          this.router.navigate(['/timer']);
        }
      });
  }
  matchingPasswordCheck() {
    if (this.registerForm.controls.confirm_password.pristine === false &&
      this.registerForm.controls.confirm_password.errors !== null) {
      this.error = 'Password does not match';
      this.player.play();
      return true;
    } else {
      return false;
    }
  }
  ngAfterViewInit() {
    this.animate();
  }

}
