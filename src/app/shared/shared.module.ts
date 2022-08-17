import { MaterialModule } from './material/material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [LoaderComponent, NotFoundComponent],
  exports: [LoaderComponent, MaterialModule],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MaterialModule
  ]
})
export class SharedModule { }
