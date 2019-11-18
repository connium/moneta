import { Component, Input } from '@angular/core';
import { Income } from './income.model';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  @Input()
  public income: Income;

  constructor(private incomeService: IncomeService) { }

  public delete(): void {
    this.incomeService.deleteIncome(this.income.id);
  }
}
