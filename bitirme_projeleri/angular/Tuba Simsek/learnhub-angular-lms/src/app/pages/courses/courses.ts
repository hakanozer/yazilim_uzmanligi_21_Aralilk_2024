import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
 import { Api } from '../../services/api'; 
 import { Pagination, Course } from '../../models/ICourse'; 
 import { CourseItem } from '../../components/course-item/course-item'; 
 import { ActivatedRoute, RouterModule } from '@angular/router'; 

 
 @Component({ 
  selector: 'app-courses', 
  imports: [CourseItem, RouterModule], 
  templateUrl: './courses.html', styleUrl: './courses.css', 
  changeDetection: ChangeDetectionStrategy.Default }) 
  
  export class Courses implements OnInit {
  
    isLoading = true 
    courseArr: Course[] = [] 
    pageInfo: Pagination = {
       page: 0, 
       per_page: 0, 
       total_items: 0, 
       total_pages: 0 } 
       pages: number[] = [] 
       current_page = 1 
       
       constructor(private api: Api, private cdr: ChangeDetectorRef, private activeRouter: ActivatedRoute) { 


       } 
       
       ngOnInit(): void { 
        this.activeRouter.queryParams.forEach((params) => {
           const page = params['page'] 
           if (page) { 
            this.current_page = page 
            this.pullData() } })
            this.pullData() } pullData() {
    this.isLoading = true 
    this.courseArr = [] 
    this.api.getAllCourses(this.current_page, 10).subscribe({
      next: (value) => {
        this.courseArr = value
        // json-server pagination meta dönmediği için şimdilik elle ayarladım
        this.pageInfo = { page: this.current_page, per_page: 10, total_items: value.length, total_pages: Math.ceil(value.length / 10) }
         this.pages = Array.from({ length: this.pageInfo.total_pages }, (_, i) => i + 1)
      },
       error: (error) => console.error(error), complete: () => {
         this.isLoading = false 
         this.cdr.detectChanges() }
    })
  }
 }