import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Income } from '../income/income.model';
import { IncomeService } from '../income/income.service';
import { Duration } from '../model/duration.constant';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {
  public income: Income;

  public constructor(private readonly route: ActivatedRoute,
                     private readonly incomeService: IncomeService,
                     private readonly location: Location) {
  }

  public durations(): string[][] {
    return Object.keys(Duration).map((durationName) => [durationName, Duration[durationName]]);
  }

  public getIncome(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.incomeService.get(id)
      .subscribe((income) => this.income = income);
  }

  public goBack(): void {
    this.location.back();
  }

  public update(): void {
    this.incomeService.update(this.income);
    this.location.back();
  }

  public ngOnInit() {
    this.getIncome();
  }
}
