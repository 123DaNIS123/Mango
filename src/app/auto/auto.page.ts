import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DataService } from '../data.service';
import { units } from '../units';
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { TypeModalComponent } from '../type-modal/type-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';

import { Router } from "@angular/router"

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {

  constructor(private ModalCtrl: ModalController, private dataService: DataService, private router: Router) { }
  units = units;

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
      this.presentUnitsModal();
    }
    else {
      this.dataService.selectedUnitsKeys = [[], []];
      this.dataService.selectedUnitsTypes = [[], []];
      let unitsRecordforIteration = units[num - 1].unitsRecord
      console.log("unitsRecordIteration:" + unitsRecordforIteration)
      console.log(unitsRecordforIteration[0], unitsRecordforIteration[1])
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
        this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0][0], this.dataService.selectedUnitsKeys[0][0] + "/L (dm3)", 0);
        this.dataService.setSelectedUnits(this.dataService.selectedUnitsTypes[0][0], this.dataService.selectedUnitsKeys[0][0] + "/L (dm3)", 1);
        console.log("ifed");
      }
      this.dataService.unitsRecord = units[num - 1].unitsRecord;
      this.presentUnitsTwoModal();
    }
  };

  async presentTypeModal() {
    const modal = await this.ModalCtrl.create({
      component: TypeModalComponent
    });
    return await modal.present();
  }

  async presentUnitsModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent
    });
    return await modal.present();
  }

  async presentUnitsTwoModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsTwoModalComponent
    });
    return await modal.present();
  }

  number_selecting(num: number) {
    this.dataService.selectedtrnum_array[1] = num
    this.dataService.selectednum_array[1] = num
    console.log("number_selecting_AutoPage")
  }

  goToPage() {
    this.dataService.selectednum_index = 0
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
    this.dataService.selectednum_index = 1
  }
}
