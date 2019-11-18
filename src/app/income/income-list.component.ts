import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Income } from './income.model';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  public incomes$: Observable<Income[]>;
  private _showPopup: boolean;

  constructor(private incomeService: IncomeService) {
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

  public ngOnInit() {
    this.incomes$ = this.incomeService.getIncomes();
  }
}
