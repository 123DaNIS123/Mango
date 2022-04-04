import { Component, OnInit } from '@angular/core';

import { units } from '../units';

import { DataService } from '../data.service';

import { UnitsModalComponent } from '../units-modal/units-modal.component';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.component.html',
  styleUrls: ['./type-modal.component.scss'],
})
export class TypeModalComponent implements OnInit {

  constructor(private dataService: DataService, private ModalCtrl: ModalController) { }

  ngOnInit() {}

  unitsRecord: Record<string, number>;

  onMeasurementSelect(num: number) {
    this.dataService.selectedUnitsKeys = [];
    this.dataService.selectedUnitsTypes = [];
    this.unitsRecord = units[num - 1].unitsRecord
    for (let item in this.dataService.unitsRecord) {
      this.dataService.selectedUnitsKeys.push(item)
      this.dataService.selectedUnitsTypes.push(this.dataService.unitsRecord[item])
      console.log("it happened");
    }
    console.log(this.dataService.selectedUnitsKeys, this.dataService.selectedUnitsTypes);
    this.ModalCtrl.dismiss();
    this.presentModal();
    console.log("1111");
  };

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent
    });
    return await modal.present();
  }

}
