import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcount } from './my-acount';

describe('MyAcount', () => {
  let component: MyAcount;
  let fixture: ComponentFixture<MyAcount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAcount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAcount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
