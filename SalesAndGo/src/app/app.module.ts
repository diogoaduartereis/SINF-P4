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
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
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
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
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
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallNumber,
    PrimaveraProvider
  ]
})
export class AppModule {}
