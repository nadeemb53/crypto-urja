import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdEnergyComponent } from './prod-energy.component';

describe('ProdEnergyComponent', () => {
  let component: ProdEnergyComponent;
  let fixture: ComponentFixture<ProdEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
