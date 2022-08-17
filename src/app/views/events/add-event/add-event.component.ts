import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent implements OnInit {
  id: string;
  hosts: any;
  hostData: any;
  countries: any;
  cities: any;
  imageUrl: any;
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };

  imageName: string;
  editMode: boolean = false;
  categories: any = [];
  eventID: number;
  event: any;

  eventForm: FormGroup = new FormGroup({
    name_en: new FormControl(null, Validators.required),
    description_en: new FormControl(null),
    type: new FormControl('public', Validators.required),
    category_id: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    is_gift_card_allowed: new FormControl(0, Validators.required),
    host_name: new FormControl(null, Validators.required),
    host_code: new FormControl(null, Validators.required),
    host_country_id: new FormControl(null, Validators.required),
    host_city_id: new FormControl(null, Validators.required),
    host_address: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.id = res.id;
    });
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param.id) {
        this.editMode = true;
        this.getEvent(param.id);
      }
    });
    this.getCategoriesList();
    this.getAllListHosts();
    this.getHostById();
    this.getAllCountries();
    this.getAllCites();
  }

  getEvent(id) {
    this.api.GET(`api/v1/dashboard/events/${id}`).subscribe((res) => {
      let event = res.body['data'];
      this.event = event;
      this.eventForm.patchValue({
        name_en: event.name,
        description_en: event.description,
        type: event.type,
        category_id: event.category?.id,
        password: null,
        date: event.date,
        is_gift_card_allowed: event.is_gift_card_allowed,
        host_name: event.host_name,
        host_code: event.host_code,
        host_country_id: event.host_country?.id,
        host_city_id: event.host_city?.id,
        host_address: event.host_address,
        image: event.image,
      });
      this.imageName = this.imageName;
      this.eventID = event?.id;
    });
  }

  onUploadImage(event) {
    this.imageName = event.target.files[0].name;
    this.eventForm.controls.image.setValue(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    }
  }

  getAllListHosts(): void {
    this.api.GET(`api/v1/dashboard/hosts`).subscribe(res => {
      this.hosts = res.body['data'];
    });
  };

  getAllCountries(): void {
    this.api.GET(`api/v1/list/countries`).subscribe(res => {
      this.countries = res.body['data'];
    });
  };

  getAllCites(): void {
    this.eventForm.controls.host_country_id.valueChanges.subscribe(country_id => {
      this.api.GET(`api/v1/list/cities`, {country_id: country_id}).subscribe(res => {
        this.cities = res.body['data'];
      });
    });
  };

  getHostById(): void {
    this.eventForm.controls.host_name.valueChanges.subscribe(id => {
      this.api.GET(`api/v1/dashboard/hosts/${id}`).subscribe(res => {
        this.hostData = res.body['data'];
        this.eventForm.patchValue({
          host_country_id: this.hostData.country.id,
          host_city_id: this.hostData.city.id,
        })
      });
    })

  };

  removeIMG(imageInput) {
    imageInput.value = null;
    this.imageName = null;
    this.eventForm.controls.image.setValue(null);
  }

  getEventType(event) {
    this.eventForm.controls.type.setValue(event);
    if (event === 'public') this.eventForm.removeControl('password');
    else this.eventForm.addControl('password', new FormControl(null));
  }

  getCardGiftAllow(event) {
    this.eventForm.controls.is_gift_card_allowed.setValue(event);
  }

  submitEvent(form) {
    const FORMDATA = new FormData();
    if (form.name_en) {
      FORMDATA.append('name_en', form.name_en);
    }
    if (form.description_en) {
      FORMDATA.append('description_en', form.description_en);
    }
    if (form.type) {
      FORMDATA.append('type', form.type);
    }
    if (form.category_id) {
      FORMDATA.append('category_id', form.category_id);
    }
    if (form.password) {
      FORMDATA.append('password', form.password);
    }
    if (form.date) {
      FORMDATA.append('date', form.date);
    }
    if (form.is_gift_card_allowed || form.is_gift_card_allowed == 0) {
      FORMDATA.append('is_gift_card_allowed', form.is_gift_card_allowed);
    }
    if (form.host_name) {
      FORMDATA.append('host_name', form.host_name);
    }
    if (form.host_code) {
      FORMDATA.append('host_code', form.host_code);
    }
    if (form.host_country_id) {
      FORMDATA.append('host_country_id', form.host_country_id);
    }
    if (form.host_city_id) {
      FORMDATA.append('host_city_id', form.host_city_id);
    }
    if (form.host_address) {
      FORMDATA.append('host_address', form.host_address);
    }
    if (form.image && this.imageName) {
      FORMDATA.append('image', form.image);
    }
    if (this.editMode) {
      FORMDATA.append('_method', 'PUT');
    }
    if (!this.editMode) {
      this.api.POST('api/v1/dashboard/events', FORMDATA).subscribe(
        (res: any) => {
          this.eventForm.reset();
          this.toaster.success(
            `<span class="text-capitalize">${res.body.message}</span>`
          );
          setTimeout(() => {
            this.router.navigateByUrl('/events/0');
          }, 1000);
        },
        (error) => {
          this.handleError.handleError(error);
        }
      );
    } else {
      this.api
        .POST(`api/v1/dashboard/events/${this.eventID}`, FORMDATA)
        .subscribe(
          (res: any) => {
            this.eventForm.reset();
            this.toaster.success(
              `<span class="text-capitalize">${res.body.message}</span>`
            );
            setTimeout(() => {
              this.router.navigateByUrl('/events/0');
            }, 1000);
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
    }
  }
  getCategoriesList() {
    this.api.GET('api/v1/dashboard/categories').subscribe((res) => {
      this.categories = res.body['data'];
    });
  }
}
