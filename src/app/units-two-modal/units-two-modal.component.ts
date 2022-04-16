import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';

import { units } from '../units';

@Component({
  selector: 'app-units-two-modal',
  templateUrl: './units-two-modal.component.html',
  styleUrls: ['./units-two-modal.component.scss'],
})
export class UnitsTwoModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private dataService: DataService) {}

  units = units;

  selectedUnit?: number;
  selectedUnitType?: string;
  selectedFirstUnit?: number;
  selectedFirstUnitType?: string;
  selectedSecondUnit?: number;
  selectedSecondUnitType?: string;
  selected_count: number;
  // onUnitSelect(str: string) {
  //   // this.dataService.selectedTypeIndex = this.dataService.selectedUnitsKeys.indexOf(str);
  //   this.selectedUnit = this.dataService.selectedUnitsTypes[this.dataService.selectedUnitsKeys.indexOf(str)];
  //   this.selectedUnitType = str;
  //   console.log(this.selectedUnit);
  //   this.dataService.setSelectedUnits(this.selectedUnit, this.selectedUnitType, this.dataService.translateNum);
  //   this.modalCtrl.dismiss();
  // }

  onUnitFirstSelect(str: string) {
    console.log(this.dataService.selectedUnitsKeys[0])
    // this.dataService.selectedTypeIndex = this.dataService.selectedUnitsKeys.indexOf(str);
    this.selectedFirstUnit = this.dataService.selectedUnitsTypes[0][this.dataService.selectedUnitsKeys[0].indexOf(str)];
    this.selectedFirstUnitType = str;
    if (this.selectedSecondUnit) {
      this.unitUpdate()
      this.dataService.setSelectedUnits(this.selectedUnit, this.selectedUnitType, this.dataService.translateNum);
      console.log("Yes, If")
    }
    if (this.selected_count == 2){
      this.selected_count = 0
      this.modalCtrl.dismiss();
    }
    this.selected_count = 1
  }

  onUnitSecondSelect(str: string) {
    // this.dataService.selectedTypeIndex = this.dataService.selectedUnitsKeys.indexOf(str);
    this.selectedSecondUnit = this.dataService.selectedUnitsTypes[1][this.dataService.selectedUnitsKeys[1].indexOf(str)];
    this.selectedSecondUnitType = str;
    if (this.selectedFirstUnit) {
      this.unitUpdate();
      this.dataService.setSelectedUnits(this.selectedUnit, this.selectedUnitType, this.dataService.translateNum);
      console.log("Yes, If, 2")
    }
    if (this.selected_count == 1){
      this.selected_count = 0
      this.modalCtrl.dismiss();
    }
    this.selected_count = 2
  }

  unitUpdate() {
    this.selectedUnit = this.selectedFirstUnit / this.selectedSecondUnit
    this.selectedUnitType = this.selectedFirstUnitType + this.selectedSecondUnitType
    console.log(this.selectedUnit, this.selectedUnitType)
  }

  ngOnInit() {
    let units_from = 0
    if (this.dataService.selectedUnitsKeys[0][0] === "mol"){units_from = 2}
    else if (this.dataService.selectedUnitsKeys[0][0] === "kg"){units_from = 5}
    else {units_from = 3}
    this.selectedFirstUnitType = this.dataService.numbers_array[this.dataService.translateNum].unit_type.slice(0, this.dataService.numbers_array[this.dataService.translateNum].unit_type.indexOf("/"));
    this.selectedFirstUnit = this.units[units_from].unitsRecord[this.selectedFirstUnitType];
    this.selectedSecondUnitType = this.dataService.numbers_array[this.dataService.translateNum].unit_type.slice(this.dataService.numbers_array[this.dataService.translateNum].unit_type.indexOf("/"), this.dataService.numbers_array[this.dataService.translateNum].unit_type.length);
    this.selectedSecondUnit = this.units[units_from].unitsRecord[this.selectedSecondUnitType];
    this.selected_count = 0
  }

}
