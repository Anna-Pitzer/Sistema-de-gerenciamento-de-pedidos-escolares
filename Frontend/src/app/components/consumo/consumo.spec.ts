import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consumo } from './consumo';

describe('Consumo', () => {
  let component: Consumo;
  let fixture: ComponentFixture<Consumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consumo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
