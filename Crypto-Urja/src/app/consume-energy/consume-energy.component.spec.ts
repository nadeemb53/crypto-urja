import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeEnergyComponent } from './consume-energy.component';

describe('ConsumeEnergyComponent', () => {
  let component: ConsumeEnergyComponent;
  let fixture: ComponentFixture<ConsumeEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
