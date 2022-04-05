import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//ModalPages Import:
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { TypeModalComponent } from '../type-modal/type-modal.component';

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
  is_comma = false;
  some_degree = 0;
  should_calculate = false;

  constructor(private ModalCtrl: ModalController, private dataService: DataService) { }

  add_number(num: number) {
    if (this.is_comma === false) {
      if (this.is_first_number === false) {this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].disp * 10 + num}
      else {this.dataService.numbers_array[this.dataService.selNum].disp = 0;
        this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].disp * 10 + num;
        this.is_first_number = false;
        this.is_c = true;}}
    else {
      this.some_degree += 1
      this.dataService.numbers_array[this.dataService.selNum].disp += (num / 10**this.some_degree)
    }
    if (this.operator) {this.dataService.numbers_array[this.dataService.selNum].firstval = this.dataService.numbers_array[this.dataService.selNum].disp}
    else {this.dataService.numbers_array[this.dataService.selNum].val = this.dataService.numbers_array[this.dataService.selNum].disp}
    this.should_calculate = true;
    this.dataService.on_num_change(this.dataService.selNum)
  }

  add_operator(str: string) {
    if (this.operator && this.should_calculate) {
      this.calculate();
      console.log("calculated", this.dataService.numbers_array[this.dataService.selNum].disp);
    }
    this.is_first_number = true;
    this.operator = str;
    this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
    this.should_calculate = false;
  }

  add_comma() {
    if (this.some_degree === 0) {
      this.is_comma = true;
    }
  }

  number_selecting(num: number) {
    if (num !== 0) {this.dataService.selNum = num;}
  }

  clear(kind: string) {
    if (kind === "AC") {
      this.dataService.numbers_array[this.dataService.selNum].val = 0;
      this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
      this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val;
      this.dataService.on_num_change(this.dataService.selNum)
    }
    else {
      this.dataService.numbers_array[this.dataService.selNum].firstval = 0;
      this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val;
      this.dataService.on_num_change(this.dataService.selNum)
    }
    this.is_first_number = true;
    this.is_c = false;
    this.is_comma = false;
    this.operator = null;
  }

  percent() {
    this.dataService.numbers_array[this.dataService.selNum].val /= 100;
    this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val;
    this.dataService.on_num_change(this.dataService.selNum);
  }

  plus_minus_switch() {
    this.dataService.numbers_array[this.dataService.selNum].val *= -1;
    this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val;
    this.dataService.on_num_change(this.dataService.selNum);
  }
 
  calculate() {
    switch (this.operator) {
      case "+":
        console.log("+ case before", this.dataService.numbers_array[this.dataService.selNum].val, this.dataService.numbers_array[this.dataService.selNum].firstval);
        this.dataService.numbers_array[this.dataService.selNum].val = this.dataService.numbers_array[this.dataService.selNum].val + this.dataService.numbers_array[this.dataService.selNum].firstval;
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
      case "+/-":
        this.dataService.numbers_array[this.dataService.selNum].val *= -1;
        break
      case "%":
        this.dataService.numbers_array[this.dataService.selNum].val /= 100;
        break
    }
    this.dataService.numbers_array[this.dataService.selNum].disp = this.dataService.numbers_array[this.dataService.selNum].val;
    this.is_first_number = true;
    this.is_c = false;
    this.is_comma = false;
    this.should_calculate = false;
    this.dataService.on_num_change(this.dataService.selNum);
  }

  onModalOpen(num: number) {
    this.dataService.translateNum = num;
    if (num !== 0) { this.dataService.selNum = num;
      this.presentTypeModal();}
    else {this.presentUnitsModal();}
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

  ngOnInit(): void {
    this.dataService.onStartFunc();
  }

}
