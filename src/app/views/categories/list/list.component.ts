import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  // Variables
  categories: any = [];

  // Constructor
  constructor(
    private api: ApisService,
    private router: Router,
    private toaster: ToastrService,
    private handleError: HandleErrorService
  ) {}

  ngOnInit(): void {
    this.getCategoriesList();
  }

  deleteCategory(category) {
    Swal.fire({
      title: `Are you sure you want to delete ${category.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d91522 ',
      cancelButtonColor: '#dee2e6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DELETE(`api/v1/dashboard/categories/${category.id}`).subscribe(
          (res) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body['message']}</span>`
            );
            this.getCategoriesList();
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
      }
    });
  }

  getCategoriesList() {
    this.api.GET('api/v1/dashboard/categories').subscribe((res) => {
      this.categories = res.body['data'];
    });
  }
}
