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
  // @Input() selectedNumber: number;

  // selectedUnits: Array<number> = [];

  constructor(private modalCtrl: ModalController, private dataService: DataService) {}

  selectedUnit?: number;
  onUnitSelect(str: string) {
    this.selectedUnit = this.dataService.selectedUnitsTypes[this.dataService.selectedUnitsKeys.indexOf(str)];
    console.log(this.selectedUnit);
    this.setUnits();
    this.modalCtrl.dismiss();
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
