import { HandleErrorService } from './../../../shared/services/handle-error.service';
import { ApisService } from './../../../shared/services/apis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // Constructor
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private router: Router,
    private handleError: HandleErrorService
  ) { }

  // Form Group
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('admin@gift.com', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl('password', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void { }

  // Login Action
  onLogin(form: any) {
    this.api.POST('api/v1/auth/login', form).subscribe(
      (res: any) => {
        if (res.body.data.token) {
          this.toaster.success(
            `<span class="text-capitalize">Welcome ${res.body.data.user.name}</span>`
          );
          // Set Token in Local Storage
          localStorage.setItem('token', res.body.data.token);
          localStorage.setItem('user', JSON.stringify(res.body.data.user));
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 1000);
        }
      },
      (error) => {
        this.handleError.handleError(error);
      }
    );
  }
}
