import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesItemComponent } from './courses-item.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
