import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contactData: any;
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService
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


  contactForm: FormGroup = new FormGroup({
    contact_en: new FormControl(null, Validators.required),
    address_en: new FormControl(null, Validators.required),
    email_1: new FormControl(null, Validators.required),
    email_2: new FormControl(null),
    phone_1: new FormControl(null, Validators.required),
    phone_2: new FormControl(null),
    facebook: new FormControl(null),
    youtube: new FormControl(null),
    twitter: new FormControl(null),
    instagram: new FormControl(null),
  });

  ngOnInit(): void {
    this.getContactData();
  }

  getContactData(): void {
    this.api.GET('api/v1/dashboard/contact-us/1').subscribe(res => {
      this.contactData = res.body['data'];
      this.contactForm.controls.contact_en.setValue(this.contactData.contact);
      this.contactForm.controls.address_en.setValue(this.contactData.address);
      this.contactForm.controls.email_1.setValue(this.contactData.email_1);
      this.contactForm.controls.email_2.setValue(this.contactData.email_2);
      this.contactForm.controls.facebook.setValue(this.contactData.facebook);
      this.contactForm.controls.instagram.setValue(this.contactData.instagram);
      this.contactForm.controls.phone_1.setValue(this.contactData.phone_1);
      this.contactForm.controls.phone_2.setValue(this.contactData.phone_2);
      this.contactForm.controls.twitter.setValue(this.contactData.twitter);
      this.contactForm.controls.youtube.setValue(this.contactData.youtube);
    });
  };

  submitContact(form) {
    const FORMDATA = new FormData();
    if (form.contact_en) {
      FORMDATA.append('contact_en', form.contact_en);
    }
    if (form.address_en) {
      FORMDATA.append('address_en', form.address_en);
    }
    if (form.email_1) {
      FORMDATA.append('email_1', form.email_1);
    }
    if (form.email_2) {
      FORMDATA.append('email_2', form.email_2);
    }
    if (form.address_en) {
      FORMDATA.append('phone_1', form.phone_1);
    }
    if (form.email_1) {
      FORMDATA.append('phone_2', form.phone_2);
    }
    if (form.facebook) {
      FORMDATA.append('facebook', form.facebook);
    }
    if (form.youtube) {
      FORMDATA.append('youtube', form.youtube);
    }
    if (form.twitter) {
      FORMDATA.append('twitter', form.twitter);
    }
    if (form.instagram) {
      FORMDATA.append('instagram', form.instagram);
    }
    this.api.POST('api/v1/dashboard/contact-us', FORMDATA).subscribe(
      (res: any) => {
        this.contactForm.reset();
        this.toaster.success(
          `<span class="text-capitalize">${res.body.message}</span>`
        );
      },
      (error) => {
        this.handleError.handleError(error);
      }
    );
  }
}
