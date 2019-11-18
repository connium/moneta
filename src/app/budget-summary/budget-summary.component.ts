import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../income/income.service';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.css']
})
export class BudgetSummaryComponent implements OnInit {
  public totalIncome = 0;

  constructor(private incomeService: IncomeService) { }

  public ngOnInit() {
    console.log('ngOnInit');
    this.incomeService.incomes.subscribe(incomes => {
      this.totalIncome = incomes
        .map((income) => income.amount)
        .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
    });
  }
}
