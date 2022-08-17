import { ApisService } from './../../../shared/services/apis.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
})

export class ForgetPasswordComponent implements OnInit {
  // Constructor
  constructor(
    private api: ApisService,
    private toaster: ToastrService,
    private router: Router,) { }

  // Form Group
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {
  }

  // Forget Password Action
  onForgetPassword(email: any) {
    this.api.POST('dashboard/forget-password', email).subscribe((res: any) => {
      if (res.body.message) {
        this.toaster.success(`<span class="text-capitalize">${res.body.message}</span>`);
        setTimeout(() => {
          this.router.navigateByUrl("/auth/check-email")
        }, 1000);
      }
    }, error => {
      // this.handleError.handleError(error)
    })
  }
}
