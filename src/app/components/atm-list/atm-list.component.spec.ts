/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AtmListComponent } from './atm-list.component';

describe('AtmListComponent', () => {
  let component: AtmListComponent;
  let fixture: ComponentFixture<AtmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
