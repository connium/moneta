import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Income } from './income.model';
import { Duration } from '../model/duration.constant';
import { Schedule } from '../model/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private readonly incomesSubject = new BehaviorSubject([]);
  public readonly incomes = this.incomesSubject.asObservable();

  public addIncome(income: Partial<Income>): void {
    console.log('add income', income);
    const defaultSchedule: Schedule = { repeatFrequency: Duration.Annual };
    const defaultIncome: Income = { id: Date.now(), name: 'New Income', amount: 0, schedule: defaultSchedule };
    const newIncome = Object.assign(defaultIncome, income);
    newIncome.amount = Number.parseFloat(newIncome.amount as any);
    const currentIncomes = [...this.incomesSubject.getValue(), newIncome];

    this.emitIncomes(currentIncomes);
  }

  public deleteIncome(id: number): void {
    console.log(`delete income ${id}`);
    const currentIncomes = this.incomesSubject.getValue().filter((income) => income.id !== id);

    this.emitIncomes(currentIncomes);
  }

  public get(id: number): Observable<Income> {
    console.log(`fetch income ${id}`);
    return of(this.incomesSubject.getValue().find((income) => income.id === id));
  }

  public update(income: Income): void {
    console.log(`update income ${income.id}`);
    const currentIncomes = this.incomesSubject.getValue().map((currentIncome) => currentIncome.id === income.id ? income : currentIncome);

    this.emitIncomes(currentIncomes);
  }

  public download(): void {
    console.log(`download ${this.incomesSubject.getValue().length} incomes`);
    const filename = `Moneta-${new Date().toISOString().substring(0, 10).replace(/-/g, '')}.json`;

    const pom = document.createElement('a');
    // tslint:disable-next-line: max-line-length
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.incomesSubject.getValue(), null, 2)));
    pom.setAttribute('download', filename);
    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
  }

  public import(data: string): void {
    console.log('importing incomes');
    const parsedData = JSON.parse(data);
    // TODO validate data
    const currentIncomes = Object.assign([], parsedData);
    console.log('imported incomes', currentIncomes);

    this.emitIncomes(currentIncomes);
  }

  private emitIncomes(incomes: Income[]): void {
    this.incomesSubject.next(incomes);
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
