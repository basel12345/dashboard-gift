import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from 'app/shared/services/apis.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {
  pageData: any;
  id: string;

  constructor(
    private api: ApisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getPage(this.id)
  }

  getPage(id) {
    this.api.GET(`api/v1/dashboard/pages/${id}`).subscribe((res) => {
      this.pageData = res.body['data'];
    });
  }


}
