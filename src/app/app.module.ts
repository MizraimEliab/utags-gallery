import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NewChannelComponent } from './components/new-channel/new-channel.component';
// import { AuthGuard } from './auth.guard';
// import { TokenInterceptorServiceService } from './service/token-interceptor-service.service';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NewChannelComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,    
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorServiceService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
