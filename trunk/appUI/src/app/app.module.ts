import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { MainModule, AuthenticationModule } from './components';
import { AppRouteModule } from './shared/config/app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    NgbModule.forRoot(),
    AppRouteModule
  ],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
