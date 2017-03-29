import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { HistoryComponent } from './component';
import { HistoryRouteModule } from './routes';

@NgModule({
  imports: [
    HistoryRouteModule,
    SharedModule
  ],
  declarations: [
    HistoryComponent
  ]
})

export class HistoryModule {}