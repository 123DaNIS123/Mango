import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

//ModalPages Import:
import { UnitsModalComponent } from '../units-modal/units-modal.component';

// import { stringify } from 'querystring';

import { units } from '../units';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  units = units;

  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma = false;


  constructor(private ModalCtrl: ModalController, private dataService: DataService) {
  }

  // selectedNumber?: number;
  onModalOpen(num: number) {
    this.dataService.setSelectedIndex(num);
    // this.selectedNumber = num;
  }

  onMeasurementSelect(num: number) {
    this.dataService.selectedUnitsKeys = [];
    this.dataService.selectedUnitsTypes = [];
    var unitsRecord:Record<string, number> = units[num - 1].unitsRecord
    for (let item in unitsRecord) {
      this.dataService.selectedUnitsKeys.push(item)
      this.dataService.selectedUnitsTypes.push(unitsRecord[item])
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
        this.dataService.display = 0;
        this.dataService.firstval = 0;
        this.operator = null;
        this.newcursor = false;
        break;
      case 'c':
        this.dataService.display = 0;
        this.isc = false;
        break;
      case '+/-':
        this.dataService.display *= (-1);
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
        if (this.dataService.firstval !== null && this.operator !== null) {
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
        this.convertFromTo();
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
        this.dataService.display = 0;
        this.newcursor = false;
      } else if (this.dataService.display !== 0) {
        if (this.iscomma === true) {
          this.dataService.display = parseFloat(`${this.dataService.display.toString()}.${nbr}`);
        } else {
          this.dataService.display = parseInt(this.dataService.display.toString() + nbr);
        }
      } else if (this.dataService.display === 0) {
        if (this.iscomma === true) {
          this.dataService.display = parseFloat(`${this.dataService.display.toString()}.${nbr}`);
        }
      }
    } else {
      if (this.newcursor === true) {
        this.dataService.display = parseInt(nbr, 0);
        this.newcursor = false;
      } else if (this.dataService.display === 0) {
        if (this.iscomma === true) {
          if (this.dataService.display.toString().indexOf('.') > -1) {
            this.dataService.display = parseFloat(this.dataService.display.toString() + nbr);
          } else {
            this.dataService.display = parseFloat(`${this.dataService.display.toString()}.${nbr}`);
          }
        } else {
          this.dataService.display = parseInt(nbr);
        }
      } else {
        if (this.iscomma === true) {
          if (this.dataService.display.toString().indexOf('.') > -1) {
            this.dataService.display = parseFloat(this.dataService.display.toString() + nbr);
          } else {
            this.dataService.display = parseFloat(`${this.dataService.display.toString()}.${nbr}`);
          }
        } else {
          this.dataService.display = parseInt(this.dataService.display.toString() + nbr);
        }
      }
    }
    this.isc = true;
  }

  addpercent() {
    this.iscomma = false;
    this.dataService.display /= 100;
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
        this.dataService.firstval /= this.dataService.display;
        break;
      case 'X':
        this.dataService.firstval *= this.dataService.display;
        break;
      case '-':
        this.dataService.firstval -= this.dataService.display;
        break;
      case '+':
        this.dataService.firstval +=  this.dataService.display;
        break;
    }
    this.dataService.display = this.dataService.firstval;
  }

  convertFromTo() {
    // this.firstval = this.firstval * UnitsModalComponent["getSelectedNumberUnit"][1];
    this.dataService.convert();
  }

  public dataUpdate(num: number) {
    console.log("this is that number :D)", num);
  }

}
