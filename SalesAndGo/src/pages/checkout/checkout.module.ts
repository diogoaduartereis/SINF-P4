import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(CheckoutPage),
  ],
})
export class CheckoutPageModule {}
