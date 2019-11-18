import { Component } from '@angular/core';
import { Income } from './income.model';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent {
  private _showPopup: boolean;

  constructor(public incomeService: IncomeService) {
    this.showPopup = false;
  }

  public add(income: Partial<Income>): void {
    this.incomeService.addIncome(income);
  }

  public get showPopup(): boolean {
    return this._showPopup;
  }

  public set showPopup(value: boolean) {
    this._showPopup = value;
  }
}
