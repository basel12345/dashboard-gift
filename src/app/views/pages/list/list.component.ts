import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApisService } from './../../../shared/services/apis.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { HandleErrorService } from 'app/shared/services/handle-error.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  // Variables
  pages: any = [];
  path = location.host;
  page: any;

  // Constructor
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPagesList();
  }

  showPage(url) {
    location.replace(`https://giftshop.ideasqr.com/${url}`)
  }

  deletePage(page) {
    Swal.fire({
      title: `Are you sure you want to delete ${page.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d91522 ',
      cancelButtonColor: '#dee2e6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DELETE(`api/v1/dashboard/pages/${page.id}`).subscribe(
          (res) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body['message']}</span>`
            );
            this.getPagesList();
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
      }
    });
  }

  getPagesList() {
    this.api.GET('api/v1/dashboard/pages').subscribe((res) => {
      this.pages = res.body['data'];
    });
  }
}
