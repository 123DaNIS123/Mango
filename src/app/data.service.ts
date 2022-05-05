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

  selAutoNum = 1;

  translateNum = 1;

  units = units;


  // values used in HomePage:
  number_1: ex_num = {
    id: 1,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol",
    param_name: "-",
    status: "idle",
    unit_id: 1
  }

  number_0: ex_num = {
    id: 0,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol",
    param_name: "-",
    status: "idle",
    unit_id: 1
  }

  autonum_0: ex_num = {
    id: 0,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol",
    param_name: "amount of substance",
    status: "idle",
    unit_id: 1
  }

  autonum_1: ex_num = {
    id: 1,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "L (dm3)",
    param_name: "volume",
    status: "idle",
    unit_id: 2
  }

  autonum_2: ex_num = {
    id: 2,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "mol/L (dm3)",
    param_name: "molar concentration",
    status: "idle",
    unit_id: 3
  }

  autonum_3: ex_num = {
    id: 3,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "kg/L (dm3)",
    param_name: "density",
    status: "idle",
    unit_id: 6
  }

  autonum_4: ex_num = {
    id: 4,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "gram",
    param_name: "substance mass",
    status: "idle",
    unit_id: 5
  }

  autonum_5: ex_num = {
    id: 5,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "gram/mol",
    param_name: "molar mass",
    status: "idle",
    unit_id: 8
  }

  autonum_6: ex_num = {
    id: 6,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "gram",
    param_name: "solution mass",
    status: "idle",
    unit_id: 5
  }

  autonum_7: ex_num = {
    id: 7,
    val: 1,
    firstval: 0,
    disp: "1",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "",
    param_name: "equivalence factor",
    status: "idle",
    unit_id: 0
  }

  autonum_8: ex_num = {
    id: 8,
    val: 0,
    firstval: 0,
    disp: "0",
    unit_val_pres: 1,
    unit_val_past: 1,
    unit_type: "eq/L (dm3)",
    param_name: "equivalent concentration",
    status: "idle",
    unit_id: 4
  }
  
  numbers_array = [this.number_0, this.number_1];

  autonum_array = [this.autonum_0, this.autonum_1, this.autonum_2, this.autonum_3, this.autonum_4,
    this.autonum_5, this.autonum_6, this.autonum_7, this.autonum_8];

  selectednum_array = [this.selNum, this.selAutoNum]
  selectedtrnum_array = [0, this.selAutoNum]
  selectednum_index = 0

  selectedarray_array = [this.numbers_array, this.autonum_array]

  firstval: number = 0;
  selectedUnitsKeys: Array<any> = [];
  selectedUnitsTypes: Array<any> = [];

  // selectedTypeIndex: number;

  unitsRecord: Record<string, number>;

  constructor() { }

  // getSelectedUnits(): Array<number> {
  //   return this.selectedUnits
  // }

  setSelectedUnits(numNumber: number, numType: string, trNum: number) {
    this.selectedarray_array[this.selectednum_index][trNum].unit_val_past = this.selectedarray_array[this.selectednum_index][trNum].unit_val_pres;
    this.selectedarray_array[this.selectednum_index][trNum].unit_val_pres = numNumber;
    // console.log("++++++++calc val while converting", this.numbers_array[trNum].val)
    // console.log("unit_val_past", this.numbers_array[trNum].unit_val_past)
    // console.log("unit_val_pres", this.numbers_array[trNum].unit_val_pres)
    // console.log("unit_type", this.numbers_array[trNum].unit_type)
    // console.log("disp", this.numbers_array[trNum].disp)
    this.selectedarray_array[this.selectednum_index][trNum].unit_type = numType;
    if (this.selectednum_index === 0 && trNum === 0) {
      this.selectedarray_array[this.selectednum_index][trNum].val = (this.selectedarray_array[this.selectednum_index][trNum].val 
        * this.selectedarray_array[this.selectednum_index][trNum].unit_val_past) 
        / this.selectedarray_array[this.selectednum_index][trNum].unit_val_pres
      this.selectedarray_array[this.selectednum_index][trNum].disp = this.selectedarray_array[this.selectednum_index][trNum].val.toString();
    }
    if (this.selectednum_index === 0) {
      // this.selectedarray_array[0][this.selectednum_array[0]].disp = this.selectedarray_array[0][this.selectednum_array[0]].disp
      this.selectedarray_array[0][this.selectednum_array[0]].val = +this.selectedarray_array[0][this.selectednum_array[0]].disp
      this.on_num_change(1)
      console.log("IFFFFFF")
    }
    // console.log("++++++++calc val after converting", this.numbers_array[trNum].val)
    // console.log("unit_val_past", this.numbers_array[trNum].unit_val_past)
    // console.log("unit_val_pres", this.numbers_array[trNum].unit_val_pres)
    // console.log("unit_type", this.numbers_array[trNum].unit_type)
    // console.log("disp", this.numbers_array[trNum].disp)
  }

  // convert() {
  //   console.log("this.display after converting", this.number_1, this.firstval, this.selectedUnits[1], this.selectedUnits[0]);
  //   this.number_1.val = (this.firstval * this.selectedUnits[1]) / this.selectedUnits[0];
  //   console.log("this.display after converting", this.number_1, this.firstval);
  // }

  on_num_change(num: number) {
    this.selectedarray_array[this.selectednum_index][0].disp = ((+this.selectedarray_array[this.selectednum_index][num].disp * this.selectedarray_array[this.selectednum_index][num].unit_val_pres) / this.selectedarray_array[this.selectednum_index][0].unit_val_pres).toString();
    this.selectedarray_array[this.selectednum_index][0].val = +this.selectedarray_array[this.selectednum_index][0].disp;
  }

  onStartFunc(): void {
    this.unitsRecord = units[0].unitsRecord
    for (let item in this.unitsRecord) {
      this.selectedUnitsKeys.push(item)
      this.selectedUnitsTypes.push(this.unitsRecord[item])
    }
  }

  // autoUpdate_() {
  //   for (let i = 0; i < 8; i++) {
  //     console.log("i: " + i)
  //     let n: number = 0
  //     let last_value: number = 0
  //     switch(i) {
  //       case (0): {n = 2
  //         last_value = this.autonum_array[n].val
  //         this.Cm_n_V()
  //         console.log("case " + i + " n = " + n)}
  //       case (1): {n = 8
  //         last_value = this.autonum_array[n].val
  //         this.Cn_Cm_ef()
  //         console.log("case " + i + " n = " + n)}
  //       case (2): {n = 1
  //         last_value = this.autonum_array[n].val
  //         this.V_n_Cm()
  //         console.log("case " + i + " n = " + n)}
  //       case (3): {n = 4
  //         last_value = this.autonum_array[n].val
  //         this.m_n_M()
  //         console.log("case " + i + " n = " + n)}
  //       case (4): {n = 5
  //         last_value = this.autonum_array[n].val
  //         this.M_m_n()
  //         console.log("case " + i + " n = " + n)}
  //       case 5: {n = 3
  //         last_value = this.autonum_array[n].val
  //         this.d_ms_v()
  //         console.log("case " + i + " n = " + n)}
  //       case 6: {n = 6
  //         last_value = this.autonum_array[n].val
  //         this.ms_d_v()
  //         console.log("case " + i + " n = " + n)}
  //       case 7: {n = 0
  //         last_value = this.autonum_array[n].val
  //         this.n_m_M()
  //         console.log("case " + i + " n = " + n)}
  //     }
  //     if (this.autonum_array[n].val === 0 || this.autonum_array[n].val === null || this.autonum_array[n].val === NaN) {
  //       this.autonum_array[n].val = last_value
  //       this.autonum_array[n].status = "notcalc"
  //       console.log("notcalc")
  //     }
  //     this.autonum_array[n].disp = this.autonum_array[n].val.toString()
  //     console.log("end of " + i + " loop")
  //     console.log(this.autonum_array[n].val, n)
  //   }
      // try {
      //   switch(i) {
      //     case 0: {n = 2
      //       last_value = this.autonum_array[n].val
      //       this.Cm_n_V()}
      //     case 1: {n = 8
      //       last_value = this.autonum_array[n].val
      //       this.Cn_Cm_ef()}
      //     case 2: {n = 1
      //       last_value = this.autonum_array[n].val
      //       this.V_n_Cm()}
      //     case 3: {n = 4
      //       last_value = this.autonum_array[n].val
      //       this.m_n_M()}
      //     case 4: {n = 5
      //       last_value = this.autonum_array[n].val
      //       this.M_m_n()}
      //     case 5: {n = 3
      //       last_value = this.autonum_array[n].val
      //       this.d_ms_v()}
      //     case 6: {n = 6
      //       last_value = this.autonum_array[n].val
      //       this.ms_d_v()}
      //     case 7: {n = 0
      //       last_value = this.autonum_array[n].val
      //       this.n_m_M()}
      //   }
      //   console.log("in try2")
      // }
    //   catch {
    //     this.autonum_array[n].val = last_value
    //     this.autonum_array[n].status = "notcalc"
    //     console.log("in catch")
    //   }
    //   finally {
    //     this.autonum_array[n].disp = this.autonum_array[n].val.toString()
    //   }
    //   console.log("i: " + i)
    // }
  // }

  counter: number = 0
  autoUpdate() {
    let selectedVal: number = null;
    // if (this.autonum_array[1].val !== 0) {
    //   this.autonum_array[2].val = this.autonum_array[0].val / this.autonum_array[1].val
    //   this.autonum_array[2].status = "calc"
    //   this.autonum_array[2].disp = this.autonum_array[2].val.toString()}
    // else if (this.autonum_array[2].val !== 0) {
    //   this.autonum_array[1].val = this.autonum_array[0].val / this.autonum_array[2].val
    //   this.autonum_array[1].status = "calc"
    //   this.autonum_array[1].disp = this.autonum_array[1].val.toString()}
    // else{
    //   this.autonum_array[2].val = 0
    //   this.autonum_array[2].status = "notcalc"
    //   this.autonum_array[2].disp = this.autonum_array[2].val.toString()
    //   this.autonum_array[1].val = 0
    //   this.autonum_array[1].status = "notcalc"
    //   this.autonum_array[1].disp = this.autonum_array[1].val.toString()
    // }
    // if (this.autonum_array[7].val !== 0 && this.autonum_array[2].val !== 0) {
    //     this.autonum_array[8].val = this.autonum_array[2].val / this.autonum_array[7].val
    //     this.autonum_array[8].status = "calc"
    //     this.autonum_array[8].disp = this.autonum_array[8].val.toString()}
    // else if (this.autonum_array[8].val !== 0 && this.autonum_array[2].val !== 0) {
    //   this.autonum_array[7].val = this.autonum_array[2].val / this.autonum_array[8].val
    //   this.autonum_array[7].status = "calc"
    //   this.autonum_array[7].disp = this.autonum_array[7].val.toString()}
    // else {
    //   if (this.autonum_array[8].val === 0) {
    //     this.autonum_array[8].status = "notcalc"}
    //   else if (this.autonum_array[7].val === 0) {
    //     this.autonum_array[7].status = "notcalc"}
    // }
    // if (this.autonum_array[8].val !== 0 && this.autonum_array[7].val !== 0) {
    //   this.autonum_array[2].val = this.autonum_array[8].val * this.autonum_array[7].val
    //   this.autonum_array[2].status = "calc"
    //   this.autonum_array[2].disp = this.autonum_array[2].val.toString()}
    // if (this.autonum_array[5].val !== 0) {
    //   this.autonum_array[4].val = this.autonum_array[0].val * this.autonum_array[5].val
    //   this.autonum_array[4].status = "calc"
    //   this.autonum_array[4].disp = this.autonum_array[4].val.toString()}
    // else if (this.autonum_array[4].val !== 0) {
    //   this.autonum_array[5].val = this.autonum_array[4].val / this.autonum_array[0].val
    //   this.autonum_array[5].status = "calc"
    //   this.autonum_array[5].disp = this.autonum_array[5].val.toString()}
    // else {
    //   this.autonum_array[4].val = 0
    //   this.autonum_array[4].status = "notcalc"
    //   this.autonum_array[4].disp = this.autonum_array[4].val.toString()
    //   this.autonum_array[5].val = 0
    //   this.autonum_array[5].status = "notcalc"
    //   this.autonum_array[5].disp = this.autonum_array[5].val.toString()
    // }
    // if (this.autonum_array[6].val !== 0 && this.autonum_array[1].val !== 0) {
    //   this.autonum_array[3].val = this.autonum_array[6].val / this.autonum_array[1].val
    //   this.autonum_array[3].status = "calc"
    //   this.autonum_array[3].disp = this.autonum_array[3].val.toString()}
    // else if (this.autonum_array[3].val !== 0 && this.autonum_array[1].val !== 0) {
    //   this.autonum_array[6].val = this.autonum_array[3].val * this.autonum_array[1].val
    //   this.autonum_array[6].status = "calc"
    //   this.autonum_array[6].disp = this.autonum_array[6].val.toString()}
    // else {
    //   if (this.autonum_array[3].val === 0) {
    //     this.autonum_array[3].status = "notcalc"
    //   }
    //   // this.autonum_array[3].val = 0
    //   // this.autonum_array[3].disp = this.autonum_array[3].val.toString()
    //   if (this.autonum_array[6].val === 0) {
    //     this.autonum_array[6].status = "notcalc"
    //   }
    //   // this.autonum_array[6].val = 0
    //   // this.autonum_array[6].status = "notcalc"
    //   // this.autonum_array[6].disp = this.autonum_array[6].val.toString()
    // }
    if (this.autonum_array[0].status !== "selected") {
      if (this.autonum_array[1].val !== 0 && this.autonum_array[2].val !== 0) {
        this.autonum_array[0].val = this.autonum_array[2].val * this.autonum_array[1].val
        this.autonum_array[0].status = "calc"
        this.autonum_array[0].disp = this.autonum_array[2].val.toString()
      }
      else if (this.autonum_array[5].val !== 0 && this.autonum_array[4].val !== 0) {
        this.autonum_array[0].val = this.autonum_array[4].val / this.autonum_array[5].val
        this.autonum_array[0].status = "calc"
        this.autonum_array[0].disp = this.autonum_array[0].val.toString()
      }
      else {
        this.autonum_array[0].status = "notcalc"
      }
    }
    else {selectedVal = 0}
    if (this.autonum_array[1].status !== "selected") {
      if (this.autonum_array[2].val !== 0 && this.autonum_array[0].val !== 0) {
        this.autonum_array[1].val = this.autonum_array[0].val / this.autonum_array[2].val
        this.autonum_array[1].status = "calc"
        this.autonum_array[1].disp = this.autonum_array[1].val.toString()
      }
      else if (this.autonum_array[6].val !== 0 && this.autonum_array[3].val !== 0) {
        this.autonum_array[1].val = this.autonum_array[6].val / this.autonum_array[3].val
        this.autonum_array[1].status = "calc"
        this.autonum_array[1].disp = this.autonum_array[1].val.toString()
      }
      else {
        this.autonum_array[1].status = "notcalc"
      }
    }
    else {selectedVal = 1}
    if (this.autonum_array[2].status !== "selected") {
      if (this.autonum_array[0].val !== 0 && this.autonum_array[1].val !== 0) {
        this.autonum_array[2].val = this.autonum_array[0].val / this.autonum_array[1].val
        this.autonum_array[2].status = "calc"
        this.autonum_array[2].disp = this.autonum_array[2].val.toString()
      }
      else if (this.autonum_array[8].val !== 0 && this.autonum_array[7].val !== 0) {
        this.autonum_array[2].val = this.autonum_array[8].val * this.autonum_array[7].val
        this.autonum_array[2].status = "calc"
        this.autonum_array[2].disp = this.autonum_array[2].val.toString()
      }
      else {
        this.autonum_array[2].status = "notcalc"
      }
    }
    else {selectedVal = 2}
    if (this.autonum_array[3].status !== "selected") {
      if (this.autonum_array[6].val !== 0 && this.autonum_array[1].val !== 0) {
        this.autonum_array[3].val = this.autonum_array[6].val / this.autonum_array[1].val
        this.autonum_array[3].status = "calc"
        this.autonum_array[3].disp = this.autonum_array[3].val.toString()
      }
      else {
        this.autonum_array[3].status = "notcalc"
      }
    }
    else {selectedVal = 3}
    if (this.autonum_array[4].status !== "selected") {
      if (this.autonum_array[5].val !== 0 && this.autonum_array[0].val !== 0) {
        this.autonum_array[4].val = this.autonum_array[5].val * this.autonum_array[0].val
        this.autonum_array[4].status = "calc"
        this.autonum_array[4].disp = this.autonum_array[4].val.toString()
      }
      else {
        this.autonum_array[4].status = "notcalc"
      }
    }
    else {selectedVal = 4}
    if (this.autonum_array[5].status !== "selected") {
      if (this.autonum_array[0].val !== 0 && this.autonum_array[4].val !== 0) {
        this.autonum_array[5].val = this.autonum_array[4].val / this.autonum_array[0].val
        this.autonum_array[5].status = "calc"
        this.autonum_array[5].disp = this.autonum_array[5].val.toString()
      }
      else {
        this.autonum_array[5].status = "notcalc"
      }
    }
    else {selectedVal = 5}
    if (this.autonum_array[6].status !== "selected") {
      if (this.autonum_array[1].val !== 0 && this.autonum_array[3].val !== 0) {
        this.autonum_array[6].val = this.autonum_array[1].val / this.autonum_array[3].val
        this.autonum_array[6].status = "calc"
        this.autonum_array[6].disp = this.autonum_array[6].val.toString()
      }
      else {
        this.autonum_array[6].status = "notcalc"
      }
    }
    else {selectedVal = 6}
    if (this.autonum_array[7].status !== "selected") {
      if (this.autonum_array[2].val !== 0 && this.autonum_array[8].val !== 0) {
        this.autonum_array[7].val = this.autonum_array[2].val / this.autonum_array[8].val
        this.autonum_array[7].status = "calc"
        this.autonum_array[7].disp = this.autonum_array[7].val.toString()
      }
      else {
        this.autonum_array[7].status = "notcalc"
      }
    }
    else {selectedVal = 7}
    if (this.autonum_array[8].status !== "selected") {
      if (this.autonum_array[2].val !== 0 && this.autonum_array[7].val !== 0) {
        this.autonum_array[8].val = this.autonum_array[2].val / this.autonum_array[7].val
        this.autonum_array[8].status = "calc"
        this.autonum_array[8].disp = this.autonum_array[8].val.toString()
      }
      else {
        this.autonum_array[8].status = "notcalc"
      }
    }
    else {selectedVal = 8}
    if (this.counter < 1) {
      this.counter += 1
      this.autoUpdate()
    }
    else {this.counter = 0
      this.autonum_array[selectedVal].status = "idle"
      selectedVal = null}
  }

  Cn_Cm_ef() {
    if (this.autonum_array[7].val !== 0) {
      this.autonum_array[8].val = this.autonum_array[2].val / this.autonum_array[7].val
      this.autonum_array[8].status = "calc"}
  }
  V_n_Cm() {
    if (this.autonum_array[2].val !== 0) {
      this.autonum_array[1].val = this.autonum_array[0].val / this.autonum_array[2].val
      this.autonum_array[1].status = "calc"}
  }
  m_n_M() {
    this.autonum_array[4].val = this.autonum_array[0].val * this.autonum_array[5].val
    this.autonum_array[4].status = "calc"
  }
  M_m_n() {
    this.autonum_array[5].val = this.autonum_array[4].val / this.autonum_array[0].val
    this.autonum_array[5].status = "calc"
  }
  d_ms_v() {
    this.autonum_array[3].val = this.autonum_array[6].val / this.autonum_array[1].val
    this.autonum_array[3].status = "calc"
  }
  ms_d_v() {
    this.autonum_array[6].val = this.autonum_array[3].val * this.autonum_array[1].val
    this.autonum_array[6].status = "calc"
  }
  n_m_M() {
    this.autonum_array[0].val = this.autonum_array[4].val / this.autonum_array[5].val
    this.autonum_array[0].status = "calc"
  }

}
