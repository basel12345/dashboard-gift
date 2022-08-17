import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit {
  @ViewChild('imageInput') imageInput: any;
  imageUrl: string | ArrayBuffer;
  pageData: any;
  arrCheck = new Set();
  @ViewChild('positionFooter') positionFooter: any;
  @ViewChild('positionHeader') positionHeader: any;
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService,
    private router: Router,
    private activedRoute: ActivatedRoute
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
  pageID: number;

  pageForm: FormGroup = new FormGroup({
    name_en: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    image: new FormControl(null),
    details_en: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((param) => {
      if (param.id) {
        this.editMode = true;
        this.getPage(param.id);
      }
    });
  }

  getPostion(postion: string) {
    this.arrCheck.add(postion);
    if(!this.positionFooter.nativeElement.checked) this.arrCheck.delete('footer');
    if(!this.positionHeader.nativeElement.checked) this.arrCheck.delete('header');
    if (this.arrCheck.size === 2) {
      this.pageForm.controls.position.setValue('both');
    } else {
      this.arrCheck.forEach(res => this.pageForm.controls.position.setValue(res));
    }
  }

  getPage(id) {
    this.api.GET(`api/v1/dashboard/pages/${id}`).subscribe((res) => {
      this.pageData = res.body['data'];
      this.pageForm.patchValue({
        name_en: this.pageData?.name,
        url: this.pageData?.url,
        details_en: this.pageData?.details,
        position: this.pageData?.position,
      });
      this.pageID = this.pageData?.id;
    });

  }

  removeIMG(imageInput) {
    imageInput.value = null;
    this.imageName = null;
    this.imageUrl = null;
    this.pageForm.controls.image.setValue(null);
  }

  onUploadImage(event) {
    this.pageForm.controls.image.setValue(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    }
  }

  submitPage(form) {
    const FORMDATA = new FormData();
    if (form.name_en) FORMDATA.append('name_en', form.name_en);
    if (form.url) FORMDATA.append('url', form.url);
    if (form.details_en) FORMDATA.append('details_en', form.details_en);
    if (form.image) FORMDATA.append('image', form.image);
    if (form.position) FORMDATA.append('position', form.position);
    if (this.editMode) FORMDATA.append('_method', 'PUT');
    this.api
      .POST(`api/v1/dashboard/${this.pageID ? 'pages/' + this.pageID : 'pages'}`, FORMDATA)
      .subscribe(
        (res: any) => {
          this.toaster.success(
            `<span class="text-capitalize">${res.body.message}</span>`
          );
          setTimeout(() => {
            this.router.navigateByUrl('/webpages');
          }, 1000);
        },
        (error) => {
          this.handleError.handleError(error);
        }
      );
  }
}
