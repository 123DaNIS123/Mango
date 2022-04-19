import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  operator: string = null;
  is_first_number: boolean = true;
  is_c = false;
  should_calculate = false;
  equals_pressed = true;

  constructor(private dataService: DataService, private router: Router, private ModalCtrl: ModalController) { }

  add_number(num: number) {
    let disp_read = this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp
    if (this.is_first_number === false) {if (disp_read.indexOf("e")===-1){
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp += num.toString()}
    else {
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = disp_read.slice(0, disp_read.indexOf("e")) + num.toString() + disp_read.slice(disp_read.indexOf("e"), disp_read.length)
    }}
    // else if (this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp.indexOf(".") === -1) {
    //   this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = num.toString();
    //   console.log(this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp, "!)!)!)))!")
    //   this.is_c = true;
    //   this.is_first_number = false;}
    else { this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = num.toString();
      this.is_c = true;
      this.is_first_number = false;}
    // 
    // if (this.some_degree === 0) {
    //   if (this.is_first_number === false) {
    //     this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp += num.toString()}
    //   else {
    //     this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = ""
    //     this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = num.toString();
    //     console.log(this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp, "!)!)!)))!")
    //     this.is_c = true;
    //     this.is_first_number = false;}
    //   }
    // 
    // else {
    //   if (this.is_first_number === false) {
    //   this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp += num.toString();}
    //   else {
    //     this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = "0."
    //     this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = num.toString();
    //     console.log(this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp, "!)!)!)))!")
    //     this.is_c = true;
    //     this.is_first_number = false;}
    // }
    if (!this.equals_pressed) {this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval = +this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp}
    else {this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val = +this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp}
    this.should_calculate = true;
    // this.dataService.on_num_change(this.dataService.selectednum_array[1])
  }

  add_operator(str: string) {
    if (this.operator && this.should_calculate) {
      this.calculate();
    }
    this.is_first_number = true;
    this.is_c = false;
    this.equals_pressed = false;
    this.operator = str;
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval = 0;
    this.should_calculate = false;
  }

  add_comma() {
    if (this.is_first_number) {
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = "0."
      this.is_first_number = false;
    }
    else if (this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp.indexOf(".") === -1) {
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp += "."
    }
  }

  number_selecting(num: number) {
    if (num !== 0) {this.dataService.selectednum_array[1] = num;}
  }

  clear(kind: string) {
    if (kind === "AC") {
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val = 0;
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval = 0;
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = "0";
      // this.dataService.on_num_change(this.dataService.selectednum_array[1])
      this.should_calculate = false;
    }
    else {
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval = 0;
      this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val.toString();
      // this.dataService.on_num_change(this.dataService.selectednum_array[1])
    }
    this.is_first_number = true;
    this.is_c = false;
    this.operator = null;
  }

  percent() {
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val /= 100;
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val.toString();
    // this.dataService.on_num_change(this.dataService.selectednum_array[1]);
  }

  plus_minus_switch() {
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val *= -1;
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val.toString();
    // this.dataService.on_num_change(this.dataService.selectednum_array[1]);
  }
 
  calculate(source: number = 1) {
    switch (this.operator) {
      case "+":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val += this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval;
        break
      case "-":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val -= this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval;
        break
      case "*":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val *= this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval;
        break
      case "/":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val /= this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval;
        break
      case "^":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val **= this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval;
        break
      case "+/-":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val *= -1;
        break
      case "%":
        this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val /= 100;
        break
    }
    if (source === 0) {
      this.equals_pressed = true      
    }
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].disp = this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].val.toString();
    this.is_first_number = true;
    this.is_c = false;
    this.dataService.selectedarray_array[1][this.dataService.selectednum_array[1]].firstval = 0;
    this.should_calculate = false;
    // this.dataService.on_num_change(this.dataService.selectednum_array[1]);
  }

  close() {
    this.ModalCtrl.dismiss()
  }

  ngOnInit() {
    this.dataService.onStartFunc();
  }

}
