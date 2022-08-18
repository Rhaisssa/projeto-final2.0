import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../Service/guard/services/auth.service';
import { UsersService } from '../Service/guard/services/users.service';
import { HotToastService } from '@ngneat/hot-toast';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatchValidator() }
    );
  
    constructor(
      private authService: AuthService,
      private router: Router,
      private toast: HotToastService,
      private usersService: UsersService,
      private fb: NonNullableFormBuilder
    ) {}
  
    ngOnInit(): void {}
  
    get email() {
      return this.signUpForm.get('email');
    }
  
    get password() {
      return this.signUpForm.get('password');
    }
  
    get confirmPassword() {
      return this.signUpForm.get('confirmPassword');
    }
  
 
    submit() {
      const { email, password } = this.signUpForm.value;
  
      if (!this.signUpForm.valid || !password || !email) {
        return;
      }
  
      this.authService
        .signUp(email, password)
        .pipe(
          switchMap(({ user: { uid } }) =>
            this.usersService.addUser({
              uid, email,
              password: ''
            })
          ),
          this.toast.observe({
            success: '',
            loading: '',
            error: ({ message }) => `${message}`,
          })
        )
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }