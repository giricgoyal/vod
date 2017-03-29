import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { HomeComponent } from './component';
import { HomeRouteModule } from './routes';

@NgModule({
  imports: [
    HomeRouteModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {}