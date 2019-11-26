import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeService } from './income/income.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly title = 'Moneta';

  constructor(private readonly router: Router,
              private readonly incomeService: IncomeService) {
  }

  public isBudgetUrl(): boolean {
    return /^\/budget/.test(this.router.url);
  }

  public save(): void {
    this.incomeService.download();
  }
}
