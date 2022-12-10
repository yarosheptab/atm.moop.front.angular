import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtmWindowComponent } from './components/atm-window/atm-window.component';
import { AtmListComponent } from './components/atm-list/atm-list.component';
import { AtmHttpService } from './services/atm-http.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtmLoginComponent } from './components/atm-login/atm-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AtmWindowComponent,
    AtmListComponent,
    AtmLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    AtmHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
