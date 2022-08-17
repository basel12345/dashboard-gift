import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsRoutingModule } from './gifts-routing.module';
import { ListComponent } from './list/list.component';
import { CardGiftComponent } from './card-gift/card-gift.component';
import { AddGiftComponent } from './add-gift/add-gift.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [ListComponent, CardGiftComponent, AddGiftComponent, ViewComponent],
  imports: [
    CommonModule,
    GiftsRoutingModule,
    NgxMatFileInputModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatChipsModule,
    DragDropModule,
    NgxFileDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxSummernoteModule,
  ],
})
export class GiftsModule {}
