import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtmListComponent } from './components/atm-list/atm-list.component';
import { AtmLoginComponent } from './components/atm-login/atm-login.component';
import { AtmMainMenuComponent } from './components/atm-main-menu/atm-main-menu.component';
import { AtmWindowComponent } from './components/atm-window/atm-window.component';
import { AtmHttpService } from './services/atm-http.service';
import { UtilsService } from './services/utils.service';
import { AtmHeaderComponent } from './components/atm-header/atm-header.component';
import { MyAccountsComponent } from './pages/my-accounts/my-accounts.component';
import { NavigationService } from './services/navigation.service';
import { AccountListItemComponent } from './components/account-list-item/account-list-item.component';
import { HttpRequestInterceptor } from './interceptors/httpRequest.interceptor';
import { SelectNewAccountTypeComponent } from './pages/select-new-account-type/select-new-account-type.component';
import { AccountPlanListItemComponent } from './components/account-plan-list-item/account-plan-list-item.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    AtmWindowComponent,
    AtmListComponent,
    AtmLoginComponent,
    AtmMainMenuComponent,
    AtmHeaderComponent,
    MyAccountsComponent,
    AccountListItemComponent,
    SelectNewAccountTypeComponent,
    AccountPlanListItemComponent,
    NewAccountComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AtmHttpService,
    FormBuilder,
    UtilsService,
    NotificationService,
    NavigationService,
     // Http Interceptor(s) -  adds with Client Credentials
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
