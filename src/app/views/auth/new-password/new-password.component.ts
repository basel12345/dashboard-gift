import { ApisService } from './../../../shared/services/apis.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
})

export class NewPasswordComponent implements OnInit {
  // Variables
  newPasswordForm: FormGroup;
  user: any = { token: '', email: '' }
  // Constructor
  constructor(
    private route: ActivatedRoute,
    private api: ApisService,
    private router: Router,
    private toaster: ToastrService,) {
    // Get Params
    this.route.queryParams.subscribe(params => {
      this.user.token = params.token;
      this.user.email = params.email;
    })
    // Form Group
    let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    this.newPasswordForm = new FormGroup({
      password: password,
      confirmPassword: confirmPassword
    })
  }

  ngOnInit(): void {
  }

  // Reset Password Action
  onNewPassword() {
    this.api.POST("dashboard/reset-password", {
      email: this.user.email,
      token: this.user.token,
      password: this.newPasswordForm.controls.password.value,
      password_confirmation: this.newPasswordForm.controls.confirmPassword.value,
    }).subscribe((res: any) => {
      this.toaster.success('New Passwords are saved, Please Login to confirm');
      setTimeout(() => {
        this.router.navigateByUrl('/auth');
      }, 1000);
    }, error => {
      // this.handleError.handleError(error)
    })
  }

}
