import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployyeDashboardComponent } from './employye-dashboard.component';

describe('EmployyeDashboardComponent', () => {
  let component: EmployyeDashboardComponent;
  let fixture: ComponentFixture<EmployyeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployyeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployyeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
