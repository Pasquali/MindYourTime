import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';

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
    });
  }
  register(formValue) {
    this.showSpinner = true;
    this.data.registerUser(formValue)
      .subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

}
