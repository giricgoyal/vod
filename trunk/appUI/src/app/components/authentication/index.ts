import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared';
import { AuthenticationRouteModule } from './routes';

@NgModule({
  imports: [
    AuthenticationRouteModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})

export class AuthenticationModule {
  constructor() {
    
  }
}