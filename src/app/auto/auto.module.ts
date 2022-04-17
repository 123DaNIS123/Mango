import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoPageRoutingModule } from './auto-routing.module';

import { AutoPage } from './auto.page';

import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoPageRoutingModule
  ],
  declarations: [AutoPage, UnitsModalComponent, UnitsTwoModalComponent],
  entryComponents: [UnitsModalComponent, UnitsTwoModalComponent]
})
export class AutoPageModule {}
