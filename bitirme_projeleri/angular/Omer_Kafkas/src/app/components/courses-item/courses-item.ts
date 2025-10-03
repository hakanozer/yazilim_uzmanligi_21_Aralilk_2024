import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Course {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  instructorName?: string;
}

@Component({
  selector: 'app-courses-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './courses-item.html',
  styleUrls: ['./courses-item.css']
})
export class CoursesItem {
  @Input() courses: Course[] = [];
  @Input() enrolling: Set<string> = new Set();
  @Input() enrolled: Set<string> = new Set(); // Kayıt olunan kurslar
  @Input() enroll!: (id: string) => void;
}
