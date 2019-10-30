import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { TweetsComponent } from './tweets/tweets.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBm-7WaBO8rULlt8_IyOpfQUf0sBXEifSI'
        })
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        LoginComponent,
        TweetsComponent,
      ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
