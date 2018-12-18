import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from  '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ClientPage } from '../pages/client/client';
import { CataloguePage } from '../pages/catalogue/catalogue';
import { CheckoutPage } from '../pages/checkout/checkout';
import { ListClientsPage } from '../pages/list-clients/list-clients';
import { CalendarModule } from 'ionic3-calendar-en';
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';
import { ComponentsModule } from '../components/components.module';
import { OrdersPage } from '../pages/orders/orders';
import { OrderPage } from '../pages/order/order';
import { ProductPage} from '../pages/product/product';
import { AddClientPage } from '../pages/add-client/add-client';
import { EditClientPage } from '../pages/edit-client/edit-client';

import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { PrimaveraProvider } from '../providers/primavera/primavera';
import {Md5} from 'ts-md5/dist/md5';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClientPage,
    CataloguePage,
    ListClientsPage,
    CheckoutPage,
    CalendarPage,
    LoginPage,
    OrdersPage,
    OrderPage,
    ProductPage,
    AddClientPage,
    EditClientPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
    CalendarModule,
    HttpClientModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClientPage,
    CataloguePage,
    ListClientsPage,
    CheckoutPage,
    CalendarPage,
    LoginPage,
    OrdersPage,
    OrderPage,
    ProductPage,
    AddClientPage,
    EditClientPage
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallNumber,
    PrimaveraProvider,
    Md5
  ]
})
export class AppModule {}
