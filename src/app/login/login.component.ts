import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpinner = false;
  error;
  constructor(private Auth: AuthService,  public router: Router, private fb: FormBuilder) {
  this.loginForm = fb.group({
    'username' : [null, Validators.required],
    'password' : [null, Validators.required],
  });
}

login(credentials) {
  this.showSpinner = true;
  this.Auth.login(credentials);
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

}
