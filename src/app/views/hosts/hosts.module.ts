import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostsRoutingModule } from './hosts-routing.module';
import { ListsComponent } from './lists/lists.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    HostsRoutingModule,
    ReactiveFormsModule
  ]
})
export class HostsModule { }
