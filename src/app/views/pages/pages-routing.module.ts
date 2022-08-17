import { AddPageComponent } from './add-page/add-page.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewPageComponent } from './view-page/view-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'pages', pathMatch: 'full'
  },
  {
    path: 'pages', component: ListComponent
  },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'about', component: AboutComponent,
  },
  {
    path: 'contact', component: ContactComponent,
  },
  {
    path: 'add-page', component: AddPageComponent
  },
  {
    path: 'view-page/:id', component: ViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
