import { Component} from '@angular/core';

import { units } from '../units';
import { DataService } from '../data.service';
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';
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
    if (num !== 3 && num !== 4 && num !== 6 && num !== 8) {
      this.dataService.selectedUnitsKeys = [];
      this.dataService.selectedUnitsTypes = [];
      let unitsRecordforIteration = units[num - 1].unitsRecord
      for (let item in unitsRecordforIteration) {
        this.dataService.selectedUnitsKeys.push(item)
        this.dataService.selectedUnitsTypes.push(unitsRecordforIteration[item])
        console.log("it happened");
      }
      if (this.dataService.selectednum_index === 0 && this.dataService.unitsRecord !== units[num - 1].unitsRecord && this.dataService.selectedtrnum_array[this.dataService.selectednum_index] !== 0) {
        console.log(this.dataService.selectedUnitsTypes[0]);
        this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0], this.dataService.selectedUnitsKeys[0], 0);
        this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0], this.dataService.selectedUnitsKeys[0], 1);
        console.log("ifed");
      }
      this.dataService.unitsRecord = units[num - 1].unitsRecord;
      // if (this.dataService.selectednum_index === 0) {
      //   this.ModalCtrl.dismiss();
      // }
      this.ModalCtrl.dismiss();
      this.presentModal();
    }
    else {
      this.dataService.selectedUnitsKeys = [[], []];
      this.dataService.selectedUnitsTypes = [[], []];
      let unitsRecordforIteration = units[num - 1].unitsRecord
      console.log("unitsRecordIteration:" + unitsRecordforIteration)
      console.log(unitsRecordforIteration[0], unitsRecordforIteration[1])
      // for (let item in unitsRecordforIteration) {
      //   this.dataService.selectedUnitsKeys.push(item)
      //   this.dataService.selectedUnitsTypes.push(unitsRecordforIteration[item])
      //   console.log("it happened");
      // }
      let first_column = true;
      for (let item in unitsRecordforIteration) {
        if (item.charAt(0) === "/") {first_column = false}
        if (first_column) {
          this.dataService.selectedUnitsKeys[0].push(item)
          this.dataService.selectedUnitsTypes[0].push(unitsRecordforIteration[item])
        }
        else {
          this.dataService.selectedUnitsKeys[1].push(item)
          this.dataService.selectedUnitsTypes[1].push(unitsRecordforIteration[item])
        }
      }
      first_column = true
      if (this.dataService.selectednum_index === 0 && this.dataService.unitsRecord !== units[num - 1].unitsRecord && this.dataService.selectedtrnum_array[this.dataService.selectednum_index] !== 0) {
        console.log(this.dataService.selectedUnitsTypes[0]);
        this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0][0], this.dataService.selectedUnitsKeys[0][0] + "/L", 0);
        this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0][0], this.dataService.selectedUnitsKeys[0][0] + "/L", 1);
        console.log("ifed");
      }
      this.dataService.unitsRecord = units[num - 1].unitsRecord;
      // if (this.dataService.selectednum_index === 0) {
      //   this.ModalCtrl.dismiss();
      // }
      this.ModalCtrl.dismiss();
      this.presentTwoModal();
    }
  };

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent,
      cssClass: 'one-column-modal'
    });
    return await modal.present();
  }

  async presentTwoModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsTwoModalComponent,
      cssClass: 'two-column-modal'
    });
    return await modal.present();
  }

  // ngOnInit() {
  //   // if (this.dataService.selectednum_index === 1) {
  //   //   this.onMeasurementSelect(this.dataService.autonum_array[this.dataService.selectedtrnum_array[1]].unit_id)
  //   // }
  // }

}
