import { NgModule } from '@angular/core';
import { NavTabsComponent } from './nav-tabs/nav-tabs';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [NavTabsComponent],
	imports: [IonicModule, CommonModule],
	exports: [NavTabsComponent]
})
export class ComponentsModule {}
