import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPanel } from './teacher-panel';

describe('TeacherPanel', () => {
  let component: TeacherPanel;
  let fixture: ComponentFixture<TeacherPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
