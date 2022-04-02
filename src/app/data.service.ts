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
    unit_id: 1,
    unit_val_pres: 1,
    unit_val_past: 1
  }

  number_2: ex_num = {
    id: 1,
    val: 0,
    unit_id: 1,
    unit_val_pres: 1,
    unit_val_past: 1
  }

  firstval: number = 0;
  selectedUnitsKeys: Array<string> = [];
  selectedUnitsTypes: Array<number> = [];

  constructor() { }

  // getSelectedUnits(): Array<number> {
  //   return this.selectedUnits
  // }

  setSelectedUnits(numNumber: number) {
    this.selectedUnits.splice(this.selectedIndex, 0, numNumber);
  }

  setSelectedIndex(numIndex: number) {
    this.selectedIndex = numIndex;
  }

  convert() {
    console.log("this.display after converting", this.number_1, this.firstval, this.selectedUnits[1], this.selectedUnits[0])
    this.number_1.val = (this.firstval * this.selectedUnits[1]) / this.selectedUnits[0];
    console.log("this.display after converting", this.number_1, this.firstval)
  }

  on_num_change() {
    this.number_2.val = (this.number_1.val * this.number_1.unit_val_pres) / this.number_2.unit_val_pres;
  }

  on_unit_change(exnum: ex_num, ptnum: number) {
    exnum.unit_val_past = exnum.unit_val_pres;
    exnum.unit_val_pres = ptnum;
    exnum.val = (exnum.val * exnum.unit_val_past) / exnum.unit_val_pres;
    return exnum;
  }
}
