import { Component, OnInit } from '@angular/core';
import { ApisService } from 'app/shared/services/apis.service';
import { HandleErrorService } from 'app/shared/services/handle-error.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-gift',
  templateUrl: './card-gift.component.html',
  styleUrls: ['./card-gift.component.scss'],
})
export class CardGiftComponent implements OnInit {
  // Variables
  pages: any[] = [];

  page: any;
  gifts: any[] = [];
  env = environment.baseURL
  // Constructor
  constructor(
    private toaster: ToastrService,
    private api: ApisService,
    private handleError: HandleErrorService
  ) { }

  ngOnInit(): void {
    this.getGiftsList();
  }

  showPage(page) {
    this.page = page;
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
    this.api
      .GET('api/v1/dashboard/gifts', { is_gift_card: 1 })
      .subscribe((res) => {
        this.pages = res.body['data'];
        this.gifts = this.pages.map(res => {
          if (res.participants.length) return { ...res, totalCost: res.participants?.reduce((a, b) => a.price + b.price) };
          else return { ...res };
        });
      });
  }
}
