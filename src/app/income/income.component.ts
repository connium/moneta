import { Component, Input } from '@angular/core';
import { Income } from './income.model';
import { IncomeService } from './income.service';
import { Duration } from '../model/duration.constant';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  @Input()
  public income: Income;

  public constructor(private incomeService: IncomeService) { }

  public delete(): void {
    this.incomeService.deleteIncome(this.income.id);
  }

  public getScheduleText(): string {
    return Object.keys(Duration)
      .find((durationName) => Duration[durationName] === this.income.schedule.repeatFrequency);
  }
}
