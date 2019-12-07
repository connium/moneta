import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Income } from '../income/income.model';
import { IncomeService } from '../income/income.service';
import { Duration } from '../model/duration.constant';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.css']
})
export class BudgetSummaryComponent implements OnInit, OnDestroy {
  public totalIncome = 0;
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  public constructor(private readonly incomeService: IncomeService) { }

  public ngOnInit(): void {
    this.incomeService.incomes
      .pipe(takeUntil(this.destroyed$))
      .subscribe((incomes) => this.sumIncomes(incomes));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  private sumIncomes(incomes: Income[]): void {
    this.totalIncome = incomes
      .map(this.getAnnualAmount)
      .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  private getAnnualAmount(income: Income): number {
    switch (income.schedule.repeatFrequency) {
      case Duration.Annual:
        return income.amount;
      case Duration.Monthly:
        return income.amount * 12;
      case Duration.Weekly:
        return income.amount * 52;
    }
  }
}
