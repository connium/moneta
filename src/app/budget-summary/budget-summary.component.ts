import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Income } from '../income/income.model';
import { IncomeService } from '../income/income.service';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.css']
})
export class BudgetSummaryComponent implements OnInit, OnDestroy {
  public totalIncome = 0;
  private unsubscribeAll$: Subject<unknown> = new Subject<unknown>();

  constructor(private incomeService: IncomeService) { }

  public ngOnInit(): void {
    this.incomeService.incomes
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(this.sumIncomes);
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll$.next();
  }

  private sumIncomes(incomes: Income[]): void {
    this.totalIncome = incomes
      .map((income) => income.amount)
      .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }
}
