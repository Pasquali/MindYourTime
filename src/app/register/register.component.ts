import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSpinner = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
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
  register(formValue) {
    this.showSpinner = true;
    console.log(this.registerForm);
    this.auth.registerUser(formValue)
      .subscribe(res => {
        this.showSpinner = false;
        console.log(res);
      });
  }

  ngOnInit() {
  }

}
