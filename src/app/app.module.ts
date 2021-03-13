import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapComponent} from './map/map.component';
import {RouterModule} from '@angular/router';
import {MapService} from './map/shared/map.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
