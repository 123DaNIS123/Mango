import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { HomePage } from '../home/home.page';

import { DataService } from '../data.service';

// import { SelectedUNITS } from '../selectedUnits';

@Component({
  selector: 'app-units-modal',
  templateUrl: './units-modal.component.html',
  styleUrls: ['./units-modal.component.scss'],
})
export class UnitsModalComponent implements OnInit {

  @Input() selectedUnitsKeys: Array<string>;
  @Input() selectedUnitsTypes: Array<number>;
  // @Input() selectedNumber: number;

  // selectedUnits: Array<number> = [];

  constructor(private modalCtrl: ModalController, private dataService: DataService) {}

  selectedUnit?: number;
  onUnitSelect(str: string) {
    this.selectedUnit = this.selectedUnitsTypes[this.selectedUnitsKeys.indexOf(str)];
    console.log(this.selectedUnit);
    this.modalCtrl.dismiss();
    this.setUnits();
  }

  // get SelectedNumberUnit() {
  //   return new Array(this.selectedNumber, this.selectedUnit);
  // }

  // getUnits(): void {
  //   this.selectedUnits = this.dataService.getSelectedUnits();
  // }

  setUnits(): void {
    this.dataService.setSelectedUnits(this.selectedUnit);
  }

  ngOnInit() {
    // this.getUnits()
  }
}
