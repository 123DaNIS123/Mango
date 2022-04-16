import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//ModalPages Import:
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { TypeModalComponent } from '../type-modal/type-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';

// import { stringify } from 'querystring';

import { units} from '../units';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  operator: string = null;
  is_first_number: boolean = true;
  is_c = false;
  some_degree = 0;
  should_calculate = false;
  equals_pressed = true;

  constructor(private ModalCtrl: ModalController, private dataService: DataService) { }

  add_number(num: number) {
    let disp_read = this.dataService.numbers_array[this.dataService.selNum].disp
    if (this.is_first_number === false) {if (disp_read.indexOf("e")===-1){
      this.dataService.numbers_array[this.dataService.selNum].disp += num.toString()}
    else {
      this.dataService.numbers_array[this.dataService.selNum].disp = disp_read.slice(0, disp_read.indexOf("e")) + num.toString() + disp_read.slice(disp_read.indexOf("e"), disp_read.length)
    }}
    // else if (this.dataService.numbers_array[this.dataService.selNum].disp.indexOf(".") === -1) {
    //   this.dataService.numbers_array[this.dataService.selNum].disp = num.toString();
    //   console.log(this.dataService.numbers_array[this.dataService.selNum].disp, "!)!)!)))!")
    //   this.is_c = true;
    //   this.is_first_number = false;}
    else { this.dataService.numbers_array[this.dataService.selNum].disp = num.toString();
      console.log(this.dataService.numbers_array[this.dataService.selNum].disp, "!)!)!)))!")
      this.is_c = true;
      this.is_first_number = false;}
    // 
    // if (this.some_degree === 0) {
    //   if (this.is_first_number === false) {
    //     this.dataService.numbers_array[this.dataService.selNum].disp += num.toString()}
    //   else {
    //     this.dataService.numbers_array[this.dataService.selNum].disp = ""
    //     this.dataService.numbers_array[this.dataService.selNum].disp = num.toString();
    //     console.log(this.dataService.numbers_array[this.dataService.selNum].disp, "!)!)!)))!")
    //     this.is_c = true;
    //     this.is_first_number = false;}
    //   }
    // 
    // else {
    //   if (this.is_first_number === false) {
    //   this.dataService.numbers_array[this.dataService.selNum].disp += num.toString();}
    //   else {
    //     this.dataService.numbers_array[this.dataService.selNum].disp = "0."
    //     this.dataService.numbers_array[this.dataService.selNum].disp = num.toString();
    //     console.log(this.dataService.numbers_array[this.dataService.selNum].disp, "!)!)!)))!")
    //     this.is_c = true;
    //     this.is_first_number = false;}
    // }
    if (!this.equals_pressed) {this.dataService.numbers_array[this.dataService.selNum].firstval = +this.dataService.numbers_array[this.dataService.selNum].disp}
    else {this.dataService.numbers_array[this.dataService.selNum].val = +this.dataService.numbers_array[this.dataService.selNum].disp}
    this.should_calculate = true;
    this.dataService.on_num_change(this.dataService.selNum)
  }

  add_operator(str: string) {
    if (this.operator && this.should_calculate) {
      this.calculate();
      console.log("calculated!@!" + this.dataService.numbers_array[this.dataService.selNum].disp);
    }
    this.is_first_number = true;
    this.is_c = false;
    this.equals_pressed = false;
    this.operator = str;
    this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
    this.should_calculate = false;
  }

  add_comma() {
    if (this.is_first_number) {
      this.dataService.numbers_array[this.dataService.selNum].disp = "0."
      this.some_degree = 1;
      console.log("add_comma")
    }
    else if (this.dataService.numbers_array[this.dataService.selNum].disp.indexOf(".") === -1) {
      this.dataService.numbers_array[this.dataService.selNum].disp += "."
      this.some_degree = 1;
    }
  }

  number_selecting(num: number) {
    if (num !== 0) {this.dataService.selNum = num;}
  }

  clear(kind: string) {
    if (kind === "AC") {
      this.dataService.numbers_array[this.dataService.selNum].val = 0;
      this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
      this.dataService.numbers_array[this.dataService.selNum].disp = "0";
      this.dataService.on_num_change(this.dataService.selNum)
      this.should_calculate = false;
    }
    else {
      this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
      this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val.toString();
      this.dataService.on_num_change(this.dataService.selNum)
    }
    this.is_first_number = true;
    this.is_c = false;
    // this.is_comma = false;
    this.some_degree = 0;
    this.operator = null;
  }

  percent() {
    this.dataService.numbers_array[this.dataService.selNum].val /= 100;
    this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val.toString();
    this.dataService.on_num_change(this.dataService.selNum);
    this.checkIfFloat();
  }

  plus_minus_switch() {
    this.dataService.numbers_array[this.dataService.selNum].val *= -1;
    this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val.toString();
    this.dataService.on_num_change(this.dataService.selNum);
  }
 
  calculate(source: number = 1) {
    switch (this.operator) {
      case "+":
        console.log("+ case before", this.dataService.numbers_array[this.dataService.selNum].val, this.dataService.numbers_array[this.dataService.selNum].firstval);
        this.dataService.numbers_array[this.dataService.selNum].val += this.dataService.numbers_array[this.dataService.selNum].firstval;
        console.log("+ case after", this.dataService.numbers_array[this.dataService.selNum].val, this.dataService.numbers_array[this.dataService.selNum].firstval);
        break
      case "-":
        this.dataService.numbers_array[this.dataService.selNum].val -= this.dataService.numbers_array[this.dataService.selNum].firstval;
        break
      case "*":
        this.dataService.numbers_array[this.dataService.selNum].val *= this.dataService.numbers_array[this.dataService.selNum].firstval;
        break
      case "/":
        this.dataService.numbers_array[this.dataService.selNum].val /= this.dataService.numbers_array[this.dataService.selNum].firstval;
        break
      case "^":
        this.dataService.numbers_array[this.dataService.selNum].val **= this.dataService.numbers_array[this.dataService.selNum].firstval;
        break
      case "+/-":
        this.dataService.numbers_array[this.dataService.selNum].val *= -1;
        break
      case "%":
        this.dataService.numbers_array[this.dataService.selNum].val /= 100;
        break
    }
    if (source === 0) {
      this.equals_pressed = true      
    }
    this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val.toString();
    this.is_first_number = true;
    this.is_c = false;
    // this.is_comma = false;
    this.some_degree = 0;
    this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
    this.checkIfFloat();
    this.should_calculate = false;
    this.dataService.on_num_change(this.dataService.selNum);
  }

  checkIfFloat() {
    // if (!Number.isInteger(this.dataService.numbers_array[this.dataService.selNum].disp)) {
    if (this.dataService.numbers_array[this.dataService.selNum].disp.indexOf(".") !== -1) {
      this.some_degree = this.dataService.numbers_array[this.dataService.selNum].disp.length - this.dataService.numbers_array[this.dataService.selNum].disp.indexOf(".")
      console.log("CheckIfFloat: " + this.some_degree)
    }
  }

  onModalOpen(num: number) {
    this.dataService.translateNum = num;
    if (num !== 0) { this.dataService.selNum = num;
      this.presentTypeModal();}
    else if (this.dataService.selectedUnitsKeys.length !== 2)
    {this.presentUnitsModal();}
    else {this.presentUnitsTwoModal();}
  }

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

  ngOnInit(): void {
    this.dataService.onStartFunc();
  }

}
