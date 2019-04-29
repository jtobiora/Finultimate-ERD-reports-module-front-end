/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalesReportClusterComponent } from './sales-report-cluster.component';

describe('SalesReportClusterComponent', () => {
  let component: SalesReportClusterComponent;
  let fixture: ComponentFixture<SalesReportClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
