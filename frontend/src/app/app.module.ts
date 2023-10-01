import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import {HttpClientModule,HTTP_INTERCEPTORS ,HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import{AuthGuard} from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PrivateTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
