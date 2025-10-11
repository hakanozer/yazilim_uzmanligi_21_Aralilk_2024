import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Student } from './student';

describe('Student', () => {
  let component: Student;
  let fixture: ComponentFixture<Student>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Student]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Student);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
