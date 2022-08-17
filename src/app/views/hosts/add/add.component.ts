import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addHost: FormGroup;
  countries: any;
  cities: any;
  id: any;
  constructor(
    private fb: FormBuilder,
    private api: ApisService,
    private handleError: HandleErrorService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initHostForm();
    this.getAllCountries();
    this.getAllCites();
    this.route.queryParamMap.subscribe(res => {
      this.id = res['params'].id;
      if (this.id) {
        this.addHost.addControl('_method', new FormControl('PUT', Validators.required))
        this.api.GET(`api/v1/dashboard/hosts/${this.id}`).subscribe(res => {
          this.addHost.patchValue({
            name: res.body['data'].name,
            email: res.body['data'].email,
            phone: res.body['data'].phone,
            country_id: res.body['data'].country.id,
            city_id: res.body['data'].city.id
          });
        });
      };
    });
  }

  initHostForm(): void {
    this.addHost = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country_id: ['', Validators.required],
      city_id: ['', Validators.required]
    });
  }

  getAllCountries(): void {
    this.api.GET(`api/v1/list/countries`).subscribe(res => {
      this.countries = res.body['data'];
    });
  };

  getAllCites(): void {
    this.addHost.controls.country_id.valueChanges.subscribe(country_id => {
      this.api.GET(`api/v1/list/cities`, { country_id: country_id }).subscribe(res => {
        this.cities = res.body['data'];
      });
    });
  };

  submit() {
    this.api.POST(`api/v1/dashboard/${this.id ? 'hosts/' + this.id : 'hosts'}`, this.addHost.getRawValue()).subscribe(
      (res: any) => {
        this.addHost.reset();
        this.toaster.success(
          `<span class="text-capitalize">${res.body.message}</span>`
        );
        setTimeout(() => {
          this.router.navigateByUrl('/hosts');
        }, 1000);
      },
      (error) => {
        this.handleError.handleError(error);
      }
    )
  }

}
