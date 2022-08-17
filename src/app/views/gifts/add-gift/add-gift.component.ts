import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
})
export class AddGiftComponent implements OnInit {
  gift: any;
  id: any;
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

  giftForm: FormGroup = new FormGroup({
    name_en: new FormControl(null, Validators.required),
    description_en: new FormControl(null),
    price: new FormControl(null, Validators.required),
    status: new FormControl(0),
    event_id: new FormControl(1, Validators.required),
    is_gift_card: new FormControl(0, Validators.required),
    image: new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.id = param.id;
      if (param.id) {
        this.editMode = true;
        this.giftForm.controls.event_id.setValue(param.id);
        this.api.GET(`api/v1/dashboard/gifts/${param.id}`).subscribe((res) => {
          this.gift = res.body['data'];
          this.giftForm.patchValue({
            name_en: this.gift.name,
            description_en: this.gift.description,
            price: this.gift.price,
            is_gift_card: this.gift.is_gift_card,
            image: this.gift.image,
            event_id: this.gift.event.id
          })
        });
      }
    });
  }

  onUploadImage(event) {
    this.imageName = event.target.files[0].name;
    this.giftForm.controls.image.setValue(event.target.files[0]);
  }

  removeIMG(imageInput) {
    imageInput.value = null;
    this.imageName = null;
    this.giftForm.controls.image.setValue(null);
  }

  getCardGiftAllow(event) {
    this.giftForm.controls.is_gift_card.setValue(event);
  }

  submitGift(form) {
    const FORMDATA = new FormData();
    if (form.name_en) {
      FORMDATA.append('name_en', form.name_en);
    }
    if (form.description_en) {
      FORMDATA.append('description_en', form.description_en);
    }
    if (form.price) {
      FORMDATA.append('price', form.price);
    }
    if (form.status === 0) {
      FORMDATA.append('status', form.status);
    }
    if (this.imageName) {
      FORMDATA.append('image', form.image);
    }
    if (form.event_id) {
      FORMDATA.append('event_id', form.event_id);
    }
    FORMDATA.append('is_gift_card', form.is_gift_card);
    if (this.editMode) {
      FORMDATA.append('_method', 'PUT');
    }
    this.api.POST(`api/v1/dashboard/${this.editMode ? 'gifts/' + this.id : 'gifts'}`, FORMDATA).subscribe(
      (res: any) => {
        this.giftForm.reset();
        this.toaster.success(
          `<span class="text-capitalize">${res.body.message}</span>`
        );
        setTimeout(() => {
          this.router.navigateByUrl('/gifts');
        }, 1000);
      },
      (error) => {
        this.handleError.handleError(error);
      }
    );
  }
}
