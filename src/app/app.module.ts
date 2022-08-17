import { AuthGuard } from './shared/guard/auth.guard';
import { ApisService } from './shared/services/apis.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProviders } from './shared/interceptors/interceptorProviders';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-top-center',
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true
    }),
    NgbModule
  ],
  providers: [AuthGuard, ApisService, interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
