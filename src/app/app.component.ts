import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeService } from './income/income.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Moneta';

  constructor(public router: Router,
              private incomeService: IncomeService) {
  }

  public save(): void {
    this.incomeService.download();
  }
}
