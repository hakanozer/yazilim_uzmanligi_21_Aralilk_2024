import { Component, Input } from '@angular/core';
import { Course } from '../../models/ICourse';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-item',
  imports: [RouterModule],
  templateUrl: './course-item.html',
  styleUrl: './course-item.css'
})
export class CourseItem {
  
  @Input()
   item!: Course
}
