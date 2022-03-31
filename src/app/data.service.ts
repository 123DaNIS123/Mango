import { Injectable, EventEmitter } from '@angular/core';
import { SelectedUNITS } from './selectedUnits';

import { Observable, of } from 'rxjs';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedUnits = SelectedUNITS;
  selectedIndex = 0;

  // values from HomePage:
  display: string = '0';
  firstval: number = null;

  constructor() { }

  getSelectedUnits(): Array<number> {
    return this.selectedUnits
  }

  setSelectedUnits(numNumber: number) {
    this.selectedUnits.splice(this.selectedIndex, 0, numNumber);
  }

  setSelectedIndex(numIndex: number) {
    this.selectedIndex = numIndex;
  }

  convert() {
    console.log("this.display after converting", this.display, this.firstval, this.selectedUnits[1], this.selectedUnits[0])
    this.display = ((this.firstval * this.selectedUnits[1]) / this.selectedUnits[0]).toString();
    console.log("this.display after converting", this.display, this.firstval)
  }
}
