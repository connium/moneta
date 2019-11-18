import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Income } from './income.model';
import { INCOMES } from './mock-incomes';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private _incomes = new BehaviorSubject(INCOMES);
  incomes = this._incomes.asObservable();

  public constructor() {
  }

  public addIncome(income: Partial<Income>): void {
    console.log('add income', income);
    const defaultIncome: Income = { id: Date.now(), name: 'New Income', amount: 0 };
    const newIncome = Object.assign(defaultIncome, income);
    newIncome.amount = Number.parseFloat(newIncome.amount as any);

    this._incomes.getValue().push(newIncome);
    this._incomes.next(this._incomes.getValue());
  }

  public deleteIncome(id: number): void {
    console.log(`delete income ${id}`);
    const index = this._incomes.getValue().findIndex((income) => income.id === id);
    this._incomes.getValue().splice(index, 1);
    this._incomes.next(this._incomes.getValue());
  }

  public download(): void {
    console.log(`download ${this._incomes.getValue().length} incomes`);
    const filename = `Moneta-${new Date().toISOString().substring(0, 10).replace(/-/g, '')}.json`;

    const pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this._incomes.getValue(), null, 2)));
    pom.setAttribute('download', filename);
    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
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
