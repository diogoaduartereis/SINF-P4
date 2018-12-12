import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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

import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { PrimaveraProvider } from '../providers/primavera/primavera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClientPage,
    CataloguePage,
    ListClientsPage,
    CheckoutPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClientPage,
    CataloguePage,
    ListClientsPage,
    CheckoutPage,
    CalendarPage
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallNumber,
    PrimaveraProvider
  ]
})
export class AppModule {}
