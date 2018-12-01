import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPage } from './client';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    ClientPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(ClientPage),
  ],
})
export class ClientPageModule {}
