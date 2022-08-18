import { LoginData } from 'src/app/model/LoginData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  successResponse: boolean;

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    let form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    return form;
  }

  convertFormToUser(formGroup: FormGroup): LoginData {
    const user: LoginData = {
      email: formGroup.controls['email'].value,
      password: formGroup.controls['password'].value,
      uid: ''
    };
    return user;
  }

  submit() {
    if (!this.form.valid) {
      return;
    }


  }
}
