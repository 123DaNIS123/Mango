import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//ModalPages Import:
import { UnitsModalComponent } from '../units-modal/units-modal.component';
import { TypeModalComponent } from '../type-modal/type-modal.component';
import { UnitsTwoModalComponent } from '../units-two-modal/units-two-modal.component';

import { Router } from "@angular/router"

import { DataService } from '../data.service';

import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  operator: string = null;
  is_first_number: boolean = true;
  is_c = false;
  should_calculate = false;
  equals_pressed = true;

  rExp: RegExp = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/

  expand_bool: boolean = false;
  _delete_index: number = 0;

  constructor(private ModalCtrl: ModalController, private dataService: DataService, private router: Router) { }

  add_number(num: number) {
    let disp_read = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp
    if (this.is_first_number === false) {if (this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length > 14) {
      // if (!this.equals_pressed) {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
      // else {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
      // this.should_calculate = true;
      // this.dataService.on_num_change(1)
      return}
      if (disp_read.indexOf("e")===-1){
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp += num.toString()}
      else {
        // this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = disp_read.slice(0, disp_read.indexOf("e")) + (+disp_read.slice(disp_read.indexOf("e"), disp_read.length) + 1).toString()
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = disp_read.slice(0, disp_read.indexOf("e")) + num.toString() + disp_read.slice(disp_read.indexOf("e"), disp_read.length)
      }
    }
    else { this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = num.toString();
      console.log(this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp, "!)!)!)))!");
      this.is_c = true;
      this.is_first_number = false;}
    this.disp_val_update()
  }

  disp_val_update() {
    if (!this.equals_pressed) {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
    else {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
    this.should_calculate = true;
    this.dataService.on_num_change(1)
    console.log(this.dataService.selectedarray_array[0][this.dataService.selectednum_array[1]].disp)
  }

  add_operator(str: string) {
    if (this.operator && this.should_calculate) {
      this.calculate();
    }
    this.is_first_number = true;
    this.is_c = false;
    this.operator = str;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
    this.should_calculate = false;
    this.equals_pressed = false;
  }

  add_comma() {
    if (this.is_first_number) {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "0."
      this.is_first_number = false;
    }
    else if (this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.indexOf(".") === -1) {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp += "."
    }
  }

  clear(kind: string) {
    if (kind === "AC") {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = 0;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "0";
      this.dataService.on_num_change(1);
    }
    else {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val.toString();
      this.dataService.on_num_change(1);
    }
    this.should_calculate = false;
    this.is_first_number = true;
    this.is_c = false;
    // this.is_comma = false;
    this.operator = null;
  }

  percent() {
    // this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val /= 100;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = (+this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp / 100).toString();
    if (!this.equals_pressed) {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
    else {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
    this.dataService.on_num_change(1);
  }

  plus_minus_switch() {
    // this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val *= -1;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = (+this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp * (-1)).toString();
    if (!this.equals_pressed) {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
    else {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = +this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp}
    this.dataService.on_num_change(1);
  }
 
  calculate(source: number = 1) {
    switch (this.operator) {
      case "+":
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val += this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval;
        break
      case "-":
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val -= this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval;
        break
      case "*":
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val *= this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval;
        break
      case "/":
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val /= this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval;
        break
      case "^":
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val **= this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval;
        break
    }
    if (source === 0) {
      this.equals_pressed = true      
    }
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val.toString();
    this.is_first_number = true;
    this.is_c = false;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
    this.should_calculate = false;
    // this.dataService.on_num_change(this.dataService.selectednum_array[0]);
    this.dataService.on_num_change(1);
    if (this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp == "NaN") {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = 0;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "0";
      this.dataService.on_num_change(1);
      this.operator = null;
      this.is_first_number = true;
      this.is_c = false;
      this.should_calculate = false;
      this.equals_pressed = true;
    }
  }

  delete() {
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.slice(0, this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length - 1)
    if (this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length === 0) {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "0"
    }
    this.disp_val_update()
  }

  toogle_bool() {
    this.expand_bool = !this.expand_bool
    if (this.expand_bool) {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "";
    }
    else {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "0";
      this.should_calculate = false;
      this.is_first_number = true;
      this.is_c = false;
      this.operator = null;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = 0;
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
    }
    this.dataService.on_num_change(1);
  }

  // When toogled:

  setCaret() {
    var el = document.getElementById("theNumber")
    var range = document.createRange()
    var sel = window.getSelection()
    
    console.log("That el: " + el)
    range.setStart(el, 1)
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}

  public get delete_index() {
    return this._delete_index
  }

  public set delete_index(num: number) {
    let len = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length
    console.log("before: "  + this._delete_index)
    this._delete_index = num
    console.log("after: "  + this._delete_index)
    if (this._delete_index >= len) {
      this._delete_index = len - 1
      console.log("this._delete_index len")
    }
    if (this._delete_index < 0) {
      this._delete_index = 0
    }
    this.setCaret();
    console.log(this._delete_index)
    console.log("len = " + len)
  }

  add_number_toogled(add_str: string) {
    let str = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = str.slice(0, this.delete_index + 1) + add_str + str.slice(this.delete_index + 1, this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length);
    this.delete_index += 1;
  }

  delete_toogled() {
    let str = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp;
    if (this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length) {
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = str.slice(0, this.delete_index) + str.slice(this.delete_index + 1, this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp.length);
    this.delete_index -= 1;
    console.log("Yes")
    }
  }

  index_move(num: number) {
    this.delete_index +=num
  }

  clear_toogled() {
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = 0;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = 0;
    this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "";
    this.dataService.on_num_change(1);
    this.delete_index = 0;
  }

  calculate_toogled() {
    let ans = this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp;
    try {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = eval(ans);
    } catch(e) {
      this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = "";
    }
    this.dataService.on_num_change(1);
  }


  onModalOpen(num: number) {
    this.dataService.selectedtrnum_array[0] = num;
    if (num !== 0) { 
      this.presentTypeModal();}
    else if (this.dataService.selectedUnitsKeys.length !== 2)
      {this.presentUnitsModal();}
    else {this.presentUnitsTwoModal();}
  }

  async presentTypeModal() {
    const modal = await this.ModalCtrl.create({
      component: TypeModalComponent,
      cssClass: 'one-column-modal'
    });
    return await modal.present();
  }

  async presentUnitsModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent,
      cssClass: 'one-column-modal'
    });
    return await modal.present();
  }

  async presentUnitsTwoModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsTwoModalComponent,
      cssClass: 'two-column-modal'
    });
    return await modal.present();
  }

  // goToPage() {
  //   this.dataService.selectednum_index = 1
  //   this.router.navigateByUrl("/auto");
  // }

  writeToClipboard = async (num:number) => {
    await Clipboard.write({
      string: this.dataService.numbers_array[num].disp
    });
    // else if (num==10 || num==11) {
    //   await Clipboard.write({
    //     string: this.dataService.numbers_array[num[1]].disp + " " + this.dataService.numbers_array[num[1]].unit_type
    //   });
    // }
  };

  writeToClipboardAll = async (num:number) => {
    await Clipboard.write({
      string: this.dataService.numbers_array[num].disp + " " + this.dataService.numbers_array[num].unit_type
    });
  };

  checkClipboard = async () => {
    const { type, value } = await Clipboard.read();
    if (type=="text/plain") {
      if (this.rExp.test(value)){
        this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].disp = value;
        if (!this.equals_pressed) {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].firstval = +value}
        else {this.dataService.selectedarray_array[0][this.dataService.selectednum_array[0]].val = +value}
        this.dataService.on_num_change(1);
      }
    }
    // console.log(`Got ${type} from clipboard: ${value}`);
  };

  ngOnInit(): void {
    this.dataService.onStartFunc();
    this.dataService.selectednum_index = 0
    this.dataService.selectednum_array[0] = 1
  }

}
