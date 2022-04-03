import { Injectable, EventEmitter } from '@angular/core';
import { SelectedUNITS } from './selectedUnits';

import { Observable, of } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import { units, ex_num } from './units';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedUnits = SelectedUNITS;
  selectedIndex = 0;

  units = units;


  // values used in HomePage:
  number_1: ex_num = {
    id: 1,
    val: 0,
    firstval: 0,
    disp: 0,
    unit_id: 1,
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol"
  }

  number_0: ex_num = {
    id: 0,
    val: 100,
    firstval: 100,
    disp: 100,
    unit_id: 1,
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol"
  }

  
  numbers_array = [this.number_0, this.number_1];


  firstval: number = 0;
  selectedUnitsKeys: Array<string> = [];
  selectedUnitsTypes: Array<number> = [];

  constructor() { }

  // getSelectedUnits(): Array<number> {
  //   return this.selectedUnits
  // }

  setSelectedUnits(numNumber: number, numType: string) {
    // this.selectedUnits.splice(this.selectedIndex, 0, numNumber);
    this.numbers_array[this.selectedIndex].unit_val_past = this.numbers_array[this.selectedIndex].unit_val_pres;
    this.numbers_array[this.selectedIndex].unit_val_pres = numNumber;
    this.numbers_array[this.selectedIndex].val = (this.numbers_array[this.selectedIndex].val 
      * this.numbers_array[this.selectedIndex].unit_val_past) 
      / this.numbers_array[this.selectedIndex].unit_val_pres
      this.numbers_array[this.selectedIndex].unit_type = numType;
  }

  convert() {
    console.log("this.display after converting", this.number_1, this.firstval, this.selectedUnits[1], this.selectedUnits[0]);
    this.number_1.val = (this.firstval * this.selectedUnits[1]) / this.selectedUnits[0];
    console.log("this.display after converting", this.number_1, this.firstval);
  }

  on_num_change() {
    this.number_0.val = (this.number_1.val * this.number_1.unit_val_pres) / this.number_0.unit_val_pres;
  }
}
