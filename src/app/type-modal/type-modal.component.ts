import { Component} from '@angular/core';

import { units } from '../units';
import { DataService } from '../data.service';
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.component.html',
  styleUrls: ['./type-modal.component.scss'],
})
export class TypeModalComponent{

  units = units;

  constructor(private dataService: DataService, private ModalCtrl: ModalController) { }

  onMeasurementSelect(num: number) {
    this.dataService.selectedUnitsKeys = [];
    this.dataService.selectedUnitsTypes = [];
    let unitsRecordforIteration = units[num - 1].unitsRecord
    for (let item in unitsRecordforIteration) {
      this.dataService.selectedUnitsKeys.push(item)
      this.dataService.selectedUnitsTypes.push(unitsRecordforIteration[item])
      console.log("it happened");
    }
    if (this.dataService.unitsRecord !== units[num - 1].unitsRecord && this.dataService.translateNum !== 0) {
      console.log(this.dataService.selectedUnitsTypes[0]);
      this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0], this.dataService.selectedUnitsKeys[0], 0);
      console.log("ifed");
    }
    this.dataService.unitsRecord = units[num - 1].unitsRecord;
    this.ModalCtrl.dismiss();
    this.presentModal();
  };

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent
    });
    return await modal.present();
  }

}
