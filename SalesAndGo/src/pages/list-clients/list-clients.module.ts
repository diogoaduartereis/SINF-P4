import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListClientsPage } from './list-clients';

@NgModule({
  declarations: [
    ListClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListClientsPage),
  ],
})
export class ListClientsPageModule {}
