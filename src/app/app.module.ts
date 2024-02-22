import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login/login.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
//captcha
import { NgxCaptchaModule } from 'ngx-captcha';
//camera
import { WebcamModule } from 'ngx-webcam';

//home
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';

//login
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

//modal 
import { MatDialogModule } from '@angular/material/dialog';
import { TokenInterceptorService } from './login/interceptor/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

  ],
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    NgxCaptchaModule,
    WebcamModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [
  /*   {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
