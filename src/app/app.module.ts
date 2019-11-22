import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { BudgetComponent } from './budget/budget.component';
import { ImportComponent } from './import/import.component';
import { IncomeListComponent } from './income/income-list.component';
import { IncomeComponent } from './income/income.component';
import { WelcomeComponent } from './welcome/welcome.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    BudgetSummaryComponent,
    ImportComponent,
    IncomeComponent,
    IncomeListComponent,
    BudgetComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
