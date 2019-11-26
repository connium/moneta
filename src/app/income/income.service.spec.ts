import { TestBed } from '@angular/core/testing';
import { Income } from './income.model';
import { IncomeService } from './income.service';

describe('IncomeService', () => {
  let incomeService: IncomeService;
  let dateNowMock: jest.SpyInstance;
  let subscription: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);

    incomeService = TestBed.get(IncomeService);
    subscription = jest.fn();
    incomeService.incomes.subscribe(subscription);
  });

  afterEach(() => {
    dateNowMock.mockRestore();
  });

  it('should be created', () => {
    expect(incomeService).toBeTruthy();
  });

  it('should create new income and emit updated list', () => {
    const expectedIncome: Income = {
      id: expect.any(Number),
      name: 'testName',
      amount: 1337
    };

    incomeService.addIncome({ name: 'testName', amount: 1337 });

    expect(subscription).toHaveBeenCalledTimes(2);
    expect(subscription.mock.calls[1][0]).toEqual([expectedIncome]);
  });

  it('should delete income and emit updated list', () => {
    incomeService.addIncome({ name: 'testName', amount: 1337 });
    incomeService.deleteIncome(1479427200000);

    expect(subscription.mock.calls[2][0]).toEqual([]);
  });

  it('should parse JSON string and emit list', () => {
    const firstExpectedIncome: Income = { id: 1, name: 'firstExpectedName', amount: 1337 };
    const secondExpectedIncome: Income = { id: 2, name: 'secondExpectedName', amount: 2342 };

    incomeService.import(JSON.stringify([firstExpectedIncome, secondExpectedIncome]));

    expect(subscription.mock.calls[1][0]).toEqual([firstExpectedIncome, secondExpectedIncome]);
  });
});
