import { Component, OnInit } from '@angular/core';
import { SignInData } from '../model/signInData';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../Service/guard/services/authentication.service';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  formValid = false;
  credentialsInvalid = false;
  signInForm = "";

  constructor(public authenticationService: AuthenticationService) {}



  ngOnInit() {}


  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);
    console.log("Email : " + signInForm.value.email);
    console.log("Password : " + signInForm.value.password);
    console.log(document);
    if(signInForm.value.email != "" && signInForm.value.email != null){
      console.log("Email não é vazio, nem null.")
    }
    if(signInForm.value.password != null && signInForm.value.password != ""){
      console.log("Password não é null, nem null")
    }


    if (!signInForm.valid) {
      console.log("Entrou no if (signInForm.valid)")
      this.formValid = true;
      this.credentialsInvalid = false;
      return;
    }
    this.verifyCredentials(signInForm);
  }

  private verifyCredentials(signInForm: NgForm) {
    const signInData = new SignInData(
      signInForm.value.email,
      signInForm.value.password
    );
    console.log("Dados signInData: " + signInData);

    if (!this.authenticationService.authenticate(signInData)) {
      this.formValid = false;
      this.credentialsInvalid = true;
    }
  }

}
