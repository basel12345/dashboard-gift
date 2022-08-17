import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  events: any = [];
  id: string;

  // Constructor
  constructor(
    private api: ApisService,
    private router: Router,
    private toaster: ToastrService,
    private handleError: HandleErrorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id = res.id;
    });
    this.getEventsList();
  }


  deleteEvent(event) {
    Swal.fire({
      title: `Are you sure you want to delete ${event.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d91522 ',
      cancelButtonColor: '#dee2e6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DELETE(`api/v1/dashboard/events/${event.id}`).subscribe(
          (res) => {
            this.toaster.success(
              `<span class="text-capitalize">${res.body['message']}</span>`
            );
            this.getEventsList();
          },
          (error) => {
            this.handleError.handleError(error);
          }
        );
      }
    });
  }

  getEventsList() {
    this.api.GET('api/v1/dashboard/events').subscribe((res) => {
      this.events = res.body['data'];
    });
  }
}
