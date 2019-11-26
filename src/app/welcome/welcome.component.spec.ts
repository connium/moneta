import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import createMockInstance from 'jest-create-mock-instance';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async(() => {
    routerMock = createMockInstance(Router);

    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [{ provide: Router, useValue: routerMock }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to BUDGET on import', () => {
    component.onImport();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/budget']);
  });
});
