import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { HomePage } from '../home/home.page';

import { DataService } from '../data.service';

// import { SelectedUNITS } from '../selectedUnits';

@Component({
  selector: 'app-units-modal',
  templateUrl: './units-modal.component.html',
  styleUrls: ['./units-modal.component.scss'],
})
export class UnitsModalComponent{
  constructor(private ModalCtrl: ModalController, private dataService: DataService) {}

  selectedUnit?: number;
  selectedUnitType?: string;
  onUnitSelect(str: string) {
    // this.dataService.selectedTypeIndex = this.dataService.selectedUnitsKeys.indexOf(str);
    this.selectedUnit = this.dataService.selectedUnitsTypes[this.dataService.selectedUnitsKeys.indexOf(str)];
    this.selectedUnitType = str;
    console.log(this.selectedUnit);
    this.dataService.setSelectedUnits(this.selectedUnit, this.selectedUnitType, this.dataService.selectedtrnum_array[this.dataService.selectednum_index]);
    this.ModalCtrl.dismiss();
  }

  // get SelectedNumberUnit() {
  //   return new Array(this.selectedNumber, this.selectedUnit);
  // }

  // getUnits(): void {
  //   this.selectedUnits = this.dataService.getSelectedUnits();
  // }
}
