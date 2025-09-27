import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCurs } from './enroll-Course';

describe('EnrollCurs', () => {
  let component: EnrollCurs;
  let fixture: ComponentFixture<EnrollCurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollCurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollCurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
