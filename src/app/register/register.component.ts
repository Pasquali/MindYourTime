import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSpinner = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService) {
    this.registerForm = fb.group({
      'first_name' : [null, Validators.required],
      'last_name' : [null, Validators.required],
      'address' : [null, Validators.required],
      'address2' : [null],
      'city' : [null, [Validators.required, Validators.maxLength(60)]],
      'state' : [null, [Validators.required, Validators.maxLength(2)]],
      'postal_code' : [null, [Validators.required, Validators.maxLength(5)]],
      'company' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'confirm_password' : [null, Validators.required],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  register(formValue) {
    this.showSpinner = true;
    console.log(this.registerForm);
    // this.data.registerUser(formValue)
    //   .subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

}
