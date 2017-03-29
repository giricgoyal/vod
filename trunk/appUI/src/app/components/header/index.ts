import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AppHeaderComponent } from './component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AppHeaderComponent
  ],
  exports: [AppHeaderComponent]
})

export class AppHeaderModule {}