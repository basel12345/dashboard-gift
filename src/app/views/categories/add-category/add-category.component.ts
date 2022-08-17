import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  editMode: boolean = false;
  categoryID: number;

  categoryForm: FormGroup = new FormGroup({
    name_en: new FormControl(null, Validators.required),
    description_en: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param.id) {
        this.editMode = true;
        this.getCategory(param.id);
      }
    });
  }

  getCategory(id) {
    this.api.GET(`api/v1/dashboard/categories/${id}`).subscribe((res) => {
      let category = res.body['data'];
      this.categoryForm.patchValue({
        name_en: category?.name,
        description_en: category?.description,
      });
      this.categoryID = category?.id;
    });
  }

  submitPage(form) {
    const FORMDATA = new FormData();
    if (form.name_en) {
      FORMDATA.append('name_en', form.name_en);
    }
    if (form.description_en) {
      FORMDATA.append('description_en', form.description_en);
    }
    if (this.editMode) {
      this.api
        .PUT(`api/v1/dashboard/categories/${this.categoryID}`, FORMDATA)
        .subscribe(
          (res: any) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body.message}</span>`
            );
            setTimeout(() => {
              this.router.navigateByUrl('/categories');
            }, 1000);
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
    } else {
      this.api.POST('api/v1/dashboard/categories', FORMDATA).subscribe(
        (res: any) => {
          this.toaster.success(
            `<span class="text-capitalize">${res.body.message}</span>`
          );
          setTimeout(() => {
            this.router.navigateByUrl('/categories');
          }, 1000);
        },
        (error) => {
          this.handleError.handleError(error);
        }
      );
    }
  }
}
