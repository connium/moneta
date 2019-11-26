import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import createMockInstance from 'jest-create-mock-instance';
import { Subject } from 'rxjs';
import { Income } from '../income/income.model';
import { IncomeService } from '../income/income.service';
import { BudgetSummaryComponent } from './budget-summary.component';


describe('BudgetSummaryComponent', () => {
  let component: BudgetSummaryComponent;
  let fixture: ComponentFixture<BudgetSummaryComponent>;
  let incomeServiceMock: jest.Mocked<IncomeService>;
  let incomeServiceIncomesMock: Subject<Income[]>;

  beforeEach(async(() => {
    incomeServiceMock = createMockInstance(IncomeService);
    incomeServiceIncomesMock = new Subject<Income[]>();
    Object.defineProperty(incomeServiceMock, 'incomes', { value: incomeServiceIncomesMock });

    TestBed.configureTestingModule({
      declarations: [BudgetSummaryComponent],
      providers: [{ provide: IncomeService, useValue: incomeServiceMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BudgetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sum incomes', () => {
    const testIncome1: Income = { id: 1, name: 'firstName', amount: 1337 };
    const testIncome2: Income = { id: 2, name: 'secondName', amount: 2342 };

    incomeServiceIncomesMock.next([testIncome1, testIncome2]);

    expect(component.totalIncome).toBe(testIncome1.amount + testIncome2.amount);
  });
});
