import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild("imageInput") imageInput: any;
  sliderData: any;
  imageUrl: any;
  url: any; //Angular 11, for stricter type
  msg = "";
  // Constructor
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

  sliders: any[];
  imageName: string;

  SliderForm: FormGroup = new FormGroup({
    title_en: new FormControl(null, Validators.required),
    content_en: new FormControl(null, Validators.required),
    image: new FormControl(null),
  });

  editMode: boolean = false;
  sliderID: string;

  ngOnInit(): void {
    this.getSlidersList();
  }

  getSlidersList() {
    this.api.GET('api/v1/dashboard/sliders').subscribe((res) => {
      this.sliders = res.body['data'];
    });
  }

  deleteSlider(slider) {
    Swal.fire({
      title: `Are you sure you want to delete ${slider.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d91522 ',
      cancelButtonColor: '#dee2e6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DELETE(`api/v1/dashboard/sliders/${slider.id}`).subscribe(
          (res) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body['message']}</span>`
            );
            this.getSlidersList();
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
      }
    });
  }

  editSlider(slider) {
    this.sliderID = slider.id;
    this.sliderData = slider;
    this.editMode = true;
    this.SliderForm.patchValue({
      title_en: slider.title,
      content_en: slider.content
    });
  }


  onUploadImage(event) {
    this.SliderForm.controls.image.setValue(event.target.files[0]);
    this.imageName = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = event => {
      this.imageUrl = reader.result;
    }
  }

  removeIMG(imageInput) {
    imageInput.value = null;
    this.imageName = null;
    this.imageUrl = null;
    this.SliderForm.controls.image.setValue(null);
  }

  submitSlider(form) {
    const FORMDATA = new FormData();
    if (form.title_en) FORMDATA.append('title_en', form.title_en);
    if (form.content_en) FORMDATA.append('content_en', form.content_en);
    if (form.image) FORMDATA.append('image', form.image);
    if (this.editMode) FORMDATA.append('_method', 'PUT')

    this.api
      .POST(`api/v1/dashboard/${this.sliderID ? 'sliders/' + this.sliderID : 'sliders'}`, FORMDATA)
      .subscribe(
        (res: any) => {
          this.getSlidersList();
          this.SliderForm.reset();
          this.editMode = false;
          this.sliderID = null;
          this.imageUrl = null;
          this.sliderData.image = '';
          this.imageInput.nativeElement.value = "";
          this.SliderForm.controls.image.setValue(null);
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
