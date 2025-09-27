import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItem } from './course-item';

describe('CourseItem', () => {
  let component: CourseItem;
  let fixture: ComponentFixture<CourseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
