import { ChangeDetectionStrategy, Component, computed, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { httpResource } from '@angular/common/http';
import { EnrollmentService } from '../../services/enrollment-service';
import { AuthService } from '../../services/auth-service';
import { endpoints } from '../../utils/apiUrl';
import { Enrollment } from '../../models/Enrollment';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-my-courses',
  imports: [RouterLink, CommonModule,Navbar],
  templateUrl: './my-courses.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCourses {
  readonly authService = inject(AuthService)
  //burada httpResource test etmek istediğim için paginationdan vazgeçtim.(headersa erişemiyor httpResource)
  readonly result = httpResource<Enrollment[]>(() => endpoints.enrollments.byUserIdEnrollmentsWithCourses(this.authService.user()!.id))
  readonly enrollments = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());
  readonly error = computed(() => this.result.error()?.message);
}
