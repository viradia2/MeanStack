/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RemovegraddatesComponent } from './removegraddates.component';

describe('RemovegraddatesComponent', () => {
  let component: RemovegraddatesComponent;
  let fixture: ComponentFixture<RemovegraddatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovegraddatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovegraddatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
