import { Component, OnInit } from '@angular/core';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {
  // Variables
  gifts: any = [];
  env = environment.baseURL
  gift: any;

  // Constructor
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService
  ) {}

  ngOnInit(): void {
    this.getGiftsList();
  }

  showGift(gift) {
    this.gift = gift;
  }

  deleteGift(gift) {
    Swal.fire({
      title: `Are you sure you want to delete ${gift.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d91522 ',
      cancelButtonColor: '#dee2e6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DELETE(`api/v1/dashboard/gifts/${gift.id}`).subscribe(
          (res) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body['message']}</span>`
            );
            this.getGiftsList();
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
      }
    });
  }

  getGiftsList() {
    this.api.GET('api/v1/dashboard/gifts').subscribe((res) => {
      this.gifts = res.body['data'];
    });
  }
}
