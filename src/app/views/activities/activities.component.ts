import { ApisService } from './../../shared/services/apis.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
})

export class ActivitiesComponent implements OnInit {
  // View Child
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  // Variables
  statusArray: any = ['Deleted', 'Expired', 'Pending', 'Published']
  displayedColumns: string[] = ['user.id', 'user.name', 'action', 'changes.status', 'date'];
  dataSource: any = [];
  activities: any = [];
  constructor(private api: ApisService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getActivities();
  }

  // Get Activities
  getActivities() {
    this.api.GET('dashboard/action-logs').subscribe(res => {
      this.activities = res.body['data'];
      this.activities.map(ele => {
        if (ele.changes.status == 0 && ele.action != "delete") {
          ele.statusName = 'pending';
        } else if (ele.changes.status == "1" && ele.action != "delete") {
          ele.statusName = 'published';
        } else if (ele.action == "delete") {
          ele.statusName = 'deleted';
        } else {
          ele.statusName = 'expired'
        }
      })
      this.dataSource = new MatTableDataSource(this.activities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    // Sort and Pagination
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Filteration
  filterStatus(event: Event) {
    const filterValue = event['value'];
    this.dataSource.filter = filterValue.toLowerCase();
  }
}
