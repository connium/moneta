import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { IncomeListComponent } from './income/income-list.component';
import { IncomeComponent } from './income/income.component';
import { ImportComponent } from './import/import.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    BudgetSummaryComponent,
    ImportComponent,
    IncomeComponent,
    IncomeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
