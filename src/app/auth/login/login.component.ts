import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/auth/login.service";
import {LoginRequest} from "../../services/auth/login-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError: string = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService) {
  }

  loginForm = this.fb.group({
    email: ['',
      [Validators.required, Validators.email]],
    password: ['',
      [Validators.required]]
  })

  get email() {
    return this.loginForm.controls.email
  };

  get password() {
    return this.loginForm.controls.password
  };

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest)
          .subscribe({
            next: (userData) => {
              console.log(userData);
            },
            error: (errorData) => {
              console.log(errorData);
              this.loginError = errorData;
            },
            complete: () => {
              console.info("Login complete");
              // Redirect
              this.router.navigateByUrl('home');
              // Reset form
              this.loginForm.reset();
            }
          });
    } else {
      this.loginForm.markAllAsTouched();
      alert("error");
    }

  }
}
