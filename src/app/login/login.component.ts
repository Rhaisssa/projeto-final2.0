import { Component, OnInit } from '@angular/core';
import { SignInData } from '../model/signInData';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  formValid = false;
  credentialsInvalid = false;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}

  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);

    if (!signInForm.valid) {
      this.formValid = true;
      this.credentialsInvalid = false;
      return;
    }
    this.verifyCredentials(signInForm);
  }

  private verifyCredentials(signInForm: NgForm) {
    const signInData = new SignInData(
      signInForm.value.usuario,
      signInForm.value.senha
    );

    if (!this.authenticationService.authenticate(signInData)) {
      this.formValid = false;
      this.credentialsInvalid = true;
    }
  }
}
