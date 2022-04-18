import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DataService } from '../data.service';
import { units } from '../units';
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { TypeModalComponent } from '../type-modal/type-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {

  constructor(private ModalCtrl: ModalController, private dataService: DataService) { }
  units = units;

  onMeasurementSelect(num: number) {
    this.presentTypeModal()
  };

  async presentTypeModal() {
    const modal = await this.ModalCtrl.create({
      component: TypeModalComponent
    });
    return await modal.present();
  }

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent
    });
    return await modal.present();
  }

  async presentTwoModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsTwoModalComponent
    });
    return await modal.present();
  }

  number_selecting(num: number) {
    this.dataService.selectednum_array[1] = num
    console.log("number_selecting_AutoPage")
  }

  ngOnInit() {
    this.dataService.selectednum_index = 1
  }

}
