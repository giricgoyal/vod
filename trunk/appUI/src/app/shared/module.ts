import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToasterModule } from 'angular2-toaster';
import { RouterModule } from '@angular/router';

import { HttpService, ToasterInjectableService, SessionService, AuthenticationService, AuthGuard, MoviesService } from './services';
import { AppLoaderComponent, CarouselComponent, PlayerComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule
  ],
  declarations: [
    AppLoaderComponent,
    CarouselComponent,
    PlayerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule,
    AppLoaderComponent,
    CarouselComponent,
    PlayerComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ HttpService, ToasterInjectableService, SessionService, AuthenticationService, AuthGuard, MoviesService ]
    }
  }
}