import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Income } from './income.model';
import { INCOMES } from './mock-incomes';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private incomes: Income[];

  constructor() {
    this.incomes = INCOMES;
  }

  public addIncome(income: Partial<Income>): void {
    console.log('add income', income);
    const defaultIncome: Income = { id: Date.now(), name: 'New Income', amount: 0 };
    this.incomes.push(Object.assign(defaultIncome, income));
  }

  public deleteIncome(id: number): void {
    console.log(`delete income ${id}`);
    const index = this.incomes.findIndex((income) => income.id === id);
    this.incomes.splice(index, 1);
  }

  public getIncomes(): Observable<Income[]> {
    return of(this.incomes)
      .pipe(
        tap(incomes => console.log(`loaded ${incomes.length} incomes`)),
        catchError(this.handleError('load', []))
      );
  }

  /**
   * Handle a failed operation and let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}