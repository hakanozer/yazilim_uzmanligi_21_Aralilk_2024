import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ICourse, Pagination } from '../../models/ICourses';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  coursesArr: ICourse[] = [];
  usersArr:any[]=[];
  pageInfo: Pagination = {
    page: 1,
    per_page: 6,
    total_items: 0,
    total_pages: 0
  };
  pages: number[] = [];
  current_page = 1;

  constructor(
    private coursesService: CoursesService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const stToken = localStorage.getItem('token');
    if (!stToken) {
      window.location.replace('/');
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      this.current_page = page;
      this.pullData();
    });
  }

  pullData(): void {
    // Önce kullanıcıları çekiyoruz
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.usersArr = users;

        // Ardından kursları çekiyoruz
        this.coursesService.getAllCourses().subscribe({
          next: (allCourses) => {
            this.pageInfo.total_items = allCourses.length;
            this.pageInfo.total_pages = Math.ceil(this.pageInfo.total_items / this.pageInfo.per_page);
            this.pages = Array.from({ length: this.pageInfo.total_pages }, (_, i) => i + 1);

            const start = (this.current_page - 1) * this.pageInfo.per_page;
            const end = this.current_page * this.pageInfo.per_page;

           
            this.coursesArr = allCourses.slice(start, end).map(course => {
              const instructor = this.usersArr.find(u => u.id === course.instructorId);
              return {
                ...course,
                instructorName: instructor ? instructor.name : 'Bilinmiyor' // Kurslara eğitmen adını ekle
              };
            });
          },
          error: (err) => console.error(err),
          complete: () => this.cdr.detectChanges()
        });
      },
      error: (err) => console.error('Kullanıcılar alınamadı:', err)
    });
  }


  goToPage(page: number): void {
    this.current_page = page;
    this.pullData();
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
