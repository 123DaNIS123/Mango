import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-units-two-modal',
  templateUrl: './units-two-modal.component.html',
  styleUrls: ['./units-two-modal.component.scss'],
})
export class UnitsTwoModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private dataService: DataService) {}

  selectedUnit?: number;
  selectedUnitType?: string;
  onUnitSelect(str: string) {
    // this.dataService.selectedTypeIndex = this.dataService.selectedUnitsKeys.indexOf(str);
    this.selectedUnit = this.dataService.selectedUnitsTypes[this.dataService.selectedUnitsKeys.indexOf(str)];
    this.selectedUnitType = str;
    console.log(this.selectedUnit);
    this.dataService.setSelectedUnits(this.selectedUnit, this.selectedUnitType, this.dataService.translateNum);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

}
