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
import { IncomeDetailComponent } from './income-detail/income-detail.component';
import { IncomeListComponent } from './income/income-list.component';
import { IncomeComponent } from './income/income.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ImportComponent,
    BudgetComponent,
    BudgetSummaryComponent,
    IncomeListComponent,
    IncomeComponent,
    IncomeDetailComponent,
    PageNotFoundComponent
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
