import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { TypeModalComponent } from '../type-modal/type-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UnitsModalComponent, TypeModalComponent, UnitsTwoModalComponent],
  entryComponents: [UnitsModalComponent, TypeModalComponent, UnitsTwoModalComponent]

})
export class HomePageModule {}
