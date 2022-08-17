import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  aboutData: any;
  imageUrl: string | ArrayBuffer;
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

  aboutForm: FormGroup = new FormGroup({
    title_en: new FormControl(null, Validators.required),
    content_en: new FormControl(null, Validators.required),
    image: new FormControl(null),
  });

  ngOnInit(): void {
    this.getAllAboutData();
  }

  getAllAboutData(): void {
    this.api.GET('api/v1/dashboard/about-us/1').subscribe(res => {
      this.aboutData = res.body['data'];
      this.aboutForm.controls.title_en.setValue(this.aboutData.title)
      this.aboutForm.controls.content_en.setValue(this.aboutData.content)
    });
  };

  onUploadImage(event) {
    this.aboutForm.controls.image.setValue(event.target.files[0]);
    const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
  }

  removeIMG(imageInput) {
    imageInput.value = null;
    this.imageUrl = null;
    this.aboutForm.controls.image.setValue(null);
  }

  submitAbout(form) {
    const FORMDATA = new FormData();
    if (form.title_en) FORMDATA.append('title_en', form.title_en);
    if (form.content_en) FORMDATA.append('content_en', form.content_en);
    if (form.image) FORMDATA.append('image', form.image);
    if (this.aboutData?.id) FORMDATA.append('_method', 'PUT');
    this.api.POST(`api/v1/dashboard/${this.aboutData?.id ? 'about-us/' + this.aboutData?.id : 'about-us'}`, FORMDATA).subscribe(
      (res: any) => {
        this.aboutForm.reset();
        this.getAllAboutData();
        this.toaster.success(
          `<span class="text-capitalize">${res.body.message}</span>`
        );
      },
      (error) => {
        this.handleError.handleError(error);
      }
    );
  };
}
