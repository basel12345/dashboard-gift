import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { ActivitiesRoutingModule } from './activities-routing.module';
// Component
import { ActivitiesComponent } from './activities.component';
// Angular Materail Modules
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ActivitiesComponent,

  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ActivitiesModule { }
