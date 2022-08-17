import { AddGiftComponent } from './add-gift/add-gift.component';
import { CardGiftComponent } from './card-gift/card-gift.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'card-gift',
    component: CardGiftComponent,
  },
  {
    path: 'add-gift',
    component: AddGiftComponent,
  },
  {
    path: 'view',
    component: ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftsRoutingModule { }
