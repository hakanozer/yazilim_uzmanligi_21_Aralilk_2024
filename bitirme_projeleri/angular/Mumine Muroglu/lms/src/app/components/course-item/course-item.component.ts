import { Component, Input } from '@angular/core';
import { ICourse } from '../../models/ICourses';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-item',
  imports: [RouterModule],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {

  @Input()
  item: ICourse | null = null;
  
  
}
