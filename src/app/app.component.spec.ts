import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import createMockInstance from 'jest-create-mock-instance';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async(() => {
    routerMock = createMockInstance(Router);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: routerMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header div h1').textContent).toContain('Moneta');
  });

  it('should return true if the router url starts with "budget"', () => {
    Object.defineProperty(routerMock, 'url', { value: 'budget' });

    expect(component.isBudgetUrl()).toBe(true);
  });

  it('should return false if the router url not starts with "budget"', () => {
    Object.defineProperty(routerMock, 'url', { value: 'prebudget' });

    expect(component.isBudgetUrl()).toBe(false);
  });
});
