import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: {
      role: "admin"
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'webpages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./views/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'gifts',
        loadChildren: () =>
          import('./views/gifts/gifts.module').then((m) => m.GiftsModule),
      },
      {
        path: 'events/:id',
        loadChildren: () =>
          import('./views/events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'hosts',
        loadChildren: () => import('./views/hosts/hosts.module').then((m) => m.HostsModule)
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
