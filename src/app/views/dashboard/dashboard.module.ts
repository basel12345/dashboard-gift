import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { DashboardRoutingModule } from './dashboard-routing.module';
// Components
import { DashboardComponent } from './dashboard.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CKEditorModule,
    SharedModule,
  ]
})
export class DashboardModule { }
