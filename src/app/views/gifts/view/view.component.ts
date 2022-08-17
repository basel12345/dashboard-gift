import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  gift: any;
  env = environment.baseURL

  constructor(
    private route: ActivatedRoute,
    private api: ApisService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      this.getGiftsList(res.id);
    });
  }

  getGiftsList(id: string) {
    this.api.GET(`api/v1/dashboard/gifts/${id}`).subscribe((res) => {
      this.gift = res.body['data'];
    });
  }

}
