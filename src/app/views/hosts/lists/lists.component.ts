import { Component, OnInit } from '@angular/core';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  hosts: any;

  constructor(
    private api: ApisService,
    private toaster: ToastrService,
    private handleError: HandleErrorService
  ) { }

  ngOnInit(): void {
    this.getAllListHosts();
  }

  getAllListHosts(): void {
    this.api.GET(`api/v1/dashboard/hosts`).subscribe(res => {
      this.hosts = res.body['data'];
    });
  };

  deleteHost(event) {
    Swal.fire({
      title: `Are you sure you want to delete ${event.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d91522 ',
      cancelButtonColor: '#dee2e6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DELETE(`api/v1/dashboard/hosts/${event.id}`).subscribe(
          (res) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body['message']}</span>`
            );
            this.getAllListHosts();
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
      }
    });
  }

}
