import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast/lib/hot-toast.service';
import { AuthService } from '../Service/guard/services/auth.service';
import { UsersService } from '../Service/guard/services/users.service';



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


  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private usersService: UsersService
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
    if (!this.signUpForm.valid) {
      return;
    }

    const { email, password } = this.signUpForm.value;
    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email })
        ),
        this.toast.observe({
          success: 'Usuário e senha cadastrado com sucesso!',
          loading: 'Carregango...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
