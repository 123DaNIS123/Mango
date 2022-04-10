import { Injectable, EventEmitter} from '@angular/core';
import { SelectedUNITS } from './selectedUnits';

import { Observable, of } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import { units, ex_num } from './units';

import { ModalController } from '@ionic/angular';
import { UnitsModalComponent } from './units-modal/units-modal.component';


@Injectable({
  providedIn: 'root'
})
export class DataService{

  selectedUnits = SelectedUNITS;
  selNum = 1;

  translateNum = 1;

  units = units;


  // values used in HomePage:
  number_1: ex_num = {
    id: 1,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_id: 1,
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol"
  }

  number_0: ex_num = {
    id: 0,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_id: 1,
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol"
  }

  
  numbers_array = [this.number_0, this.number_1];


  firstval: number = 0;
  selectedUnitsKeys: Array<string> = [];
  selectedUnitsTypes: Array<number> = [];

  // selectedTypeIndex: number;

  unitsRecord: Record<string, number>;

  constructor() { }

  // getSelectedUnits(): Array<number> {
  //   return this.selectedUnits
  // }

  setSelectedUnits(numNumber: number, numType: string, trNum: number) {
    this.numbers_array[trNum].unit_val_past = this.numbers_array[trNum].unit_val_pres;
    this.numbers_array[trNum].unit_val_pres = numNumber;
    console.log("++++++++calc val while converting", this.numbers_array[trNum].val)
    console.log("unit_val_past", this.numbers_array[trNum].unit_val_past)
    console.log("unit_val_pres", this.numbers_array[trNum].unit_val_pres)
    console.log("unit_type", this.numbers_array[trNum].unit_type)
    console.log("disp", this.numbers_array[trNum].disp)
    this.numbers_array[trNum].val = (this.numbers_array[trNum].val 
      * this.numbers_array[trNum].unit_val_past) 
      / this.numbers_array[trNum].unit_val_pres
      this.numbers_array[trNum].unit_type = numType;
    this.numbers_array[trNum].disp = this.numbers_array[trNum].val.toString();
    console.log("++++++++calc val after converting", this.numbers_array[trNum].val)
    console.log("unit_val_past", this.numbers_array[trNum].unit_val_past)
    console.log("unit_val_pres", this.numbers_array[trNum].unit_val_pres)
    console.log("unit_type", this.numbers_array[trNum].unit_type)
    console.log("disp", this.numbers_array[trNum].disp)
  }

  // convert() {
  //   console.log("this.display after converting", this.number_1, this.firstval, this.selectedUnits[1], this.selectedUnits[0]);
  //   this.number_1.val = (this.firstval * this.selectedUnits[1]) / this.selectedUnits[0];
  //   console.log("this.display after converting", this.number_1, this.firstval);
  // }

  on_num_change(num: number) {
    this.numbers_array[0].disp = ((+this.numbers_array[num].disp * this.numbers_array[num].unit_val_pres) / this.numbers_array[0].unit_val_pres).toString();
    this.numbers_array[0].val = +this.numbers_array[0].disp;
  }

  onStartFunc(): void {
    this.unitsRecord = units[0].unitsRecord
    for (let item in this.unitsRecord) {
      this.selectedUnitsKeys.push(item)
      this.selectedUnitsTypes.push(this.unitsRecord[item])
    }
  }
}
