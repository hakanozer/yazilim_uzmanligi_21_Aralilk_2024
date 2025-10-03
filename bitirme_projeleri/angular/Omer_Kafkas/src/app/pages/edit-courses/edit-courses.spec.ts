import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCourses } from './edit-courses';
import { globalTestConfig } from '../../../test-setup';

describe('EditCourses', () => {
  let component: EditCourses;
  let fixture: ComponentFixture<EditCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourses],
      providers: [...globalTestConfig.providers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
