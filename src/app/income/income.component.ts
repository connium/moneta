import { Component, Input } from '@angular/core';
import { Income } from './income.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  @Input()
  public income: Income;
}
