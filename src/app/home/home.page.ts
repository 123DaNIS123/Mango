import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

//ModalPages Import:
import { UnitsModalComponent } from '../units-modal/units-modal.component';

// import { stringify } from 'querystring';

import { units, ex_num } from '../units';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  units = units;

  unitsRecord: Record<string, number>;

  operator: any = null;
  newcursor = true;
  isc = false;
  iscomma = false;

  operator_: string = null;
  is_first_number_: boolean = true;
  is_c = false;
  is_comma = false;
  some_degree = 0;

  constructor(private ModalCtrl: ModalController, private dataService: DataService) {
  }

  add_number_(num: number) {
    if (this.is_comma === false) {
      if (this.is_first_number_ === false) {this.dataService.numbers_array[1].disp = this.dataService.numbers_array[1].disp * 10 + num}
      else {this.dataService.numbers_array[1].disp = 0;
        this.dataService.numbers_array[1].disp = this.dataService.numbers_array[1].disp * 10 + num;
        this.is_first_number_ = false;
        this.is_c = true;}}
    else {
      this.some_degree += 1
      this.dataService.numbers_array[1].disp += (num / 10**this.some_degree)
    }
    if (this.operator_) {this.dataService.numbers_array[1].firstval = this.dataService.numbers_array[1].disp}
    else {this.dataService.numbers_array[1].val = this.dataService.numbers_array[1].disp}
  }

  add_operator_(str: string) {
    this.is_first_number_ = true;
    this.operator_ = str;
    this.dataService.numbers_array[1].firstval = 0;
  }

  add_comma_() {
    if (this.some_degree === 0) {
      this.is_comma = true;
    }
  }

  clear_(kind: string) {
    if (kind === "AC") {
      this.dataService.numbers_array[1].val = 0;
      this.dataService.numbers_array[1].firstval = 0;
      this.dataService.numbers_array[1].disp = this.dataService.numbers_array[1].val;
    }
    else {
      this.dataService.numbers_array[1].firstval = 0;
      this.dataService.numbers_array[1].disp = this.dataService.numbers_array[1].val;
    }
    this.is_first_number_ = true;
    this.is_c = false;
    this.is_comma = false;
    this.operator_ = null;
  }
 
  calculate_() {
    switch (this.operator_) {
      case "+":
        console.log("+ case before", this.dataService.numbers_array[1].val, this.dataService.numbers_array[1].firstval);
        this.dataService.numbers_array[1].val = this.dataService.numbers_array[1].val + this.dataService.numbers_array[1].firstval;
        console.log("+ case after", this.dataService.numbers_array[1].val, this.dataService.numbers_array[1].firstval);
        break
      case "-":
        this.dataService.numbers_array[1].val -= this.dataService.numbers_array[1].firstval;
        break
      case "*":
        this.dataService.numbers_array[1].val *= this.dataService.numbers_array[1].firstval;
        break
      case "/":
        this.dataService.numbers_array[1].val /= this.dataService.numbers_array[1].firstval;
        break
      case "+/-":
        this.dataService.numbers_array[1].val *= -1;
        break
      case "%":
        this.dataService.numbers_array[1].val /= 100;
        break
    }
    this.dataService.numbers_array[1].disp = this.dataService.numbers_array[1].val;
    this.is_first_number_ = true;
    this.is_c = false;
    this.is_comma = false;
  }

  // selectedNumber?: number;
  onModalOpen(num: number) {
    this.dataService.selectedIndex = num;
  }

  onMeasurementSelect(num: number) {
    this.dataService.selectedUnitsKeys = [];
    this.dataService.selectedUnitsTypes = [];
    this.unitsRecord = units[num - 1].unitsRecord
    for (let item in this.unitsRecord) {
      this.dataService.selectedUnitsKeys.push(item)
      this.dataService.selectedUnitsTypes.push(this.unitsRecord[item])
      console.log("it happened");
    }
    console.log(this.dataService.selectedUnitsKeys, this.dataService.selectedUnitsTypes);
    this.ModalCtrl.dismiss();
    this.presentModal();
  };

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent
    });
    return await modal.present();
  }


  //replacing all 

  click(val: any) {
    switch (val) {
      case 'ac':
        this.dataService.numbers_array[1].val = 0;
        this.dataService.numbers_array[1].firstval = 0;
        this.operator = null;
        this.newcursor = false;
        break;
      case 'c':
        this.dataService.numbers_array[1].val = 0;
        this.isc = false;
        break;
      case '+/-':
        this.dataService.numbers_array[1].val *= (-1);
        break;
      case '%':
        this.addpercent();
        break;
      case ':':
        this.addoperator(':');
        break;
      case 'X':
        this.addoperator('X');
        break;
      case '-':
        this.addoperator('-');
        break;
      case '+':
        this.addoperator('+');
        break;
      case '=':
        if (this.dataService.numbers_array[1].firstval !== null && this.operator !== null) {
          this.calclast();
          console.log("passedd");
        }
        this.operator = null;
        break;
      case '0':
        this.addnumber('0');
        break;
      case '1':
        this.addnumber('1');
        break;
      case '2':
        this.addnumber('2');
        break;
      case '3':
        this.addnumber('3');
        break;
      case '4':
        this.addnumber('4');
        break;
      case '5':
        this.addnumber('5');
        break;
      case '6':
        this.addnumber('6');
        break;
      case '7':
        this.addnumber('7');
        break;
      case '8':
        this.addnumber('8');
        break;
      case '9':
        this.addnumber('9');
        break;
      case ',':
        this.addcomma();
        break;
      case 'Convert':
        this.dataService.convert();
        break;
    }
  }

  addcomma() {
    if (this.iscomma === false) {
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }
  }

  addnumber(nbr: string) {
    if (nbr === '0') {
      if (this.newcursor === true) {
        this.dataService.numbers_array[1].val = 0;
        this.newcursor = false;
      } else if (this.dataService.numbers_array[1].val !== 0) {
        if (this.iscomma === true) {
          this.dataService.numbers_array[1].val = parseFloat(`${this.dataService.numbers_array[1].val.toString()}.${nbr}`);
        } else {
          this.dataService.numbers_array[1].val = parseInt(this.dataService.numbers_array[1].val.toString() + nbr);
        }
      } else if (this.dataService.numbers_array[1].val === 0) {
        if (this.iscomma === true) {
          this.dataService.numbers_array[1].val = parseFloat(`${this.dataService.numbers_array[1].val.toString()}.${nbr}`);
        }
      }
    } else {
      if (this.newcursor === true) {
        this.dataService.numbers_array[1].val = parseInt(nbr, 0);
        this.newcursor = false;
      } else if (this.dataService.numbers_array[1].val === 0) {
        if (this.iscomma === true) {
          if (this.dataService.numbers_array[1].val.toString().indexOf('.') > -1) {
            this.dataService.numbers_array[1].val = parseFloat(this.dataService.numbers_array[1].val.toString() + nbr);
          } else {
            this.dataService.numbers_array[1].val = parseFloat(`${this.dataService.numbers_array[1].val.toString()}.${nbr}`);
          }
        } else {
          this.dataService.numbers_array[1].val = parseInt(nbr);
        }
      } else {
        if (this.iscomma === true) {
          if (this.dataService.numbers_array[1].val.toString().indexOf('.') > -1) {
            this.dataService.numbers_array[1].val = parseFloat(this.dataService.numbers_array[1].val.toString() + nbr);
          } else {
            this.dataService.numbers_array[1].val = parseFloat(`${this.dataService.numbers_array[1].val.toString()}.${nbr}`);
          }
        } else {
          this.dataService.numbers_array[1].val = parseInt(this.dataService.numbers_array[1].val.toString() + nbr);
        }
      }
    }
    this.isc = true;
  }

  addpercent() {
    this.iscomma = false;
    this.dataService.numbers_array[1].val /= 100;
  }

  addoperator(op: string) {
    if (this.newcursor === false) {
        this.calclast();
      }
    this.iscomma = false;
    this.operator = op;
    this.newcursor = true;
  }

  calclast() {
    switch (this.operator) {
      case ':':
        this.dataService.numbers_array[1].firstval /= this.dataService.numbers_array[1].val;
        break;
      case 'X':
        this.dataService.numbers_array[1].firstval *= this.dataService.numbers_array[1].val;
        break;
      case '-':
        this.dataService.numbers_array[1].firstval -= this.dataService.numbers_array[1].val;
        break;
      case '+':
        this.dataService.numbers_array[1].firstval +=  this.dataService.numbers_array[1].val;
        break;
    }
    this.dataService.numbers_array[1].val = this.dataService.numbers_array[1].firstval;
  }

  // convertFromTo() {
  //   // this.numbers_array[1].firstval = this.numbers_array[1].firstval * UnitsModalComponent["getSelectedNumberUnit"][1];
  //   this.dataService.convert();
  // }

  public dataUpdate(num: number) {
    console.log("this is that number :D)", num);
  }

}
