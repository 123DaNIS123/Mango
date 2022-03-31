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

  display = this.dataService.display;
  firstval = this.dataService.firstval;
  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma = false;

  selectedUnitsKeys: Array<string> = [];
  selectedUnitsTypes: Array<number> = [];

  _selectedFirstUnit: number = 0;
  _selectedSecondUnit: number = 0;

  constructor(private ModalCtrl: ModalController, private dataService: DataService) {
  }

  // selectedNumber?: number;
  onModalOpen(num: number) {
    this.dataService.setSelectedIndex(num);
    // this.selectedNumber = num;
  }

  onMeasurementSelect(num: number) {
    this.selectedUnitsKeys = [];
    this.selectedUnitsTypes = [];
    var unitsRecord:Record<string, number> = units[num - 1].unitsRecord
    for (let item in unitsRecord) {
      this.selectedUnitsKeys.push(item)
      this.selectedUnitsTypes.push(unitsRecord[item])
    }
    console.log(this.selectedUnitsKeys, this.selectedUnitsTypes);
    this.ModalCtrl.dismiss();
    this.presentModal();
  };

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: UnitsModalComponent,
      componentProps: {
        selectedUnitsTypes: this.selectedUnitsTypes,
        selectedUnitsKeys: this.selectedUnitsKeys,
        // selectedNumber: this.selectedNumber
      }
    });
    return await modal.present();
  }


  //replacing all 

  click(val: any) {
    switch (val) {
      case 'ac':
        this.dataService.display = '0';
        this.dataService.firstval = null;
        this.operator = null;
        this.newcursor = false;
        break;
      case 'c':
        this.dataService.display = '0';
        this.isc = false;
        break;
      case '+/-':
        if (Math.sign(parseInt(this.dataService.display, 0)) === 1) {
          const sign = -Math.abs(parseInt(this.dataService.display, 0));
          this.dataService.display = sign.toString();
        } else if (Math.sign(parseInt(this.dataService.display, 0)) === -1) {
          const sign = Math.abs(parseInt(this.dataService.display, 0));
          this.dataService.display = sign.toString();
        } else {
          this.dataService.display = this.dataService.display;
        }  // remove THIS ELSE !!!
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
        this.dataService.display = nbr;
        this.newcursor = false;
      } else if (this.dataService.display !== '0') {
        if (this.iscomma === true) {
          this.dataService.display = `${this.dataService.display.toString()}.${nbr}`;
        } else {
          this.dataService.display = this.dataService.display.toString() + nbr;
        }
      } else if (this.dataService.display === '0') {
        if (this.iscomma === true) {
          this.dataService.display = `${this.dataService.display.toString()}.${nbr}`;
        }
      }
    } else {
      if (this.newcursor === true) {
        this.dataService.display = nbr;
        this.newcursor = false;
      } else if (this.dataService.display === '0') {
        if (this.iscomma === true) {
          if (this.dataService.display.toString().indexOf('.') > -1) {
            this.dataService.display = this.dataService.display.toString() + nbr;
          } else {
            this.dataService.display = `${this.dataService.display.toString()}.${nbr}`;
          }
        } else {
          this.dataService.display = nbr;
        }
      } else {
        if (this.iscomma === true) {
          if (this.dataService.display.toString().indexOf('.') > -1) {
            this.dataService.display = this.dataService.display.toString() + nbr;
          } else {
            this.dataService.display = `${this.dataService.display.toString()}.${nbr}`;
          }
        } else {
          this.dataService.display = this.dataService.display.toString() + nbr;
        }
      }
    }
    this.isc = true;
  }

  addpercent() {
    this.iscomma = false;
    const dispval = parseInt(this.dataService.display, 0) / 100;
    this.dataService.display = dispval.toString();
  }

  addoperator(op: string) {
    if (this.newcursor === false) {
      if (this.dataService.firstval === null) {
        if (this.iscomma === true) {
          this.dataService.firstval = parseFloat(this.dataService.display);
        } else {
          this.dataService.firstval = parseInt(this.dataService.display, 0);
        }
      }
      if (this.dataService.firstval !== null && this.operator !== null) {
        this.calclast();
      }
    }
    this.iscomma = false;
    this.operator = op;
    this.newcursor = true;
  }

  calclast() {
    switch (this.operator) {
      case ':':
        if (this.iscomma === true) {
          this.dataService.firstval = (this.dataService.firstval / parseFloat(this.dataService.display));
        } else {
          this.dataService.firstval = (this.dataService.firstval / parseInt(this.dataService.display, 0));
        }
        break;
      case 'X':
        if (this.iscomma === true) {
          this.dataService.firstval = (this.dataService.firstval * parseFloat(this.dataService.display));
        } else {
          this.dataService.firstval = (this.dataService.firstval * parseInt(this.dataService.display, 0));
        }
        break;
      case '-':
        if (this.iscomma === true) {
          this.dataService.firstval = (this.dataService.firstval - parseFloat(this.dataService.display));
        } else {
          this.dataService.firstval = (this.dataService.firstval - parseInt(this.dataService.display, 0));
        }
        break;
      case '+':
        if (this.iscomma === true) {
          this.dataService.firstval = (this.dataService.firstval + parseFloat(this.dataService.display));
        } else {
          this.dataService.firstval = (this.dataService.firstval + parseInt(this.dataService.display, 0));
        }
        break;
    }
    this.dataService.display = this.dataService.firstval.toString();
  }

  convertFromTo() {
    // this.firstval = this.firstval * UnitsModalComponent["getSelectedNumberUnit"][1];
    this.dataService.convert();
  }

  public dataUpdate(num: number) {
    console.log("this is that number :D)", num);
  }

  public set selectedFirstUnit(num: number) {
    this._selectedFirstUnit = num;
    this.dataUpdate(this._selectedFirstUnit)
  }

  public set selectedSecondUnit(num: number) {
    this._selectedSecondUnit = num;
    this.dataUpdate(this._selectedSecondUnit)
  }

}
