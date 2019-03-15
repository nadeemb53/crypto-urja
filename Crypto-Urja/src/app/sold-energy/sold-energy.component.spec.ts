import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldEnergyComponent } from './sold-energy.component';

describe('SoldEnergyComponent', () => {
  let component: SoldEnergyComponent;
  let fixture: ComponentFixture<SoldEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
