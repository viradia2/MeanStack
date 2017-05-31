/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewsubmittedgraddatesComponent } from './viewsubmittedgraddates.component';

describe('ViewsubmittedgraddatesComponent', () => {
  let component: ViewsubmittedgraddatesComponent;
  let fixture: ComponentFixture<ViewsubmittedgraddatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsubmittedgraddatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsubmittedgraddatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
