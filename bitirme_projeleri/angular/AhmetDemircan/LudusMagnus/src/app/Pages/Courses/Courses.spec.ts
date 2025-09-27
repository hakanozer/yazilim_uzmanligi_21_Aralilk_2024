import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cursus } from './Courses';

describe('Cursus', () => {
  let component: Cursus;
  let fixture: ComponentFixture<Cursus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cursus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cursus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
