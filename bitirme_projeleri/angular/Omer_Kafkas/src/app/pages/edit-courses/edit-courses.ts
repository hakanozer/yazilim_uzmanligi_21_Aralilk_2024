import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Api } from '../../api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-courses',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-courses.html',
  styleUrl: './edit-courses.css'
})
export class EditCourses implements OnDestroy {
  private api = inject(Api);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  loading = signal(true);
  saving = signal(false);
  addingLesson = signal(false);
  courses = signal<any[]>([]);
  categories = signal<any[]>([]);
  selectedCourseId = signal<string>('');
  private manualImage = false;
  private subs: any[] = [];

  private readonly categoryImageMap: Record<string, string> = {
    c1: 'assets/frontend_egitimi.png',
    c2: 'assets/backend_egitimi.png',
    c3: 'assets/siber_guvenlik_egitimi.png',
    c4: 'assets/veritabanı_egitimi.png',
    c5: 'assets/sistem_egitimi.png'
  };

  readonly form = this.fb.group({
    id: [''],
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    categoryId: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01), Validators.max(10000)]],
    durationHours: [1, [Validators.required, Validators.min(1), Validators.max(500)]],
    level: ['Başlangıç', Validators.required],
    image: ['']
  });

  readonly lessonForm = this.fb.group({
    title: ['', Validators.required],
    durationMin: [10, [Validators.required, Validators.min(1)]]
  });

  currentUser = computed(() => this.auth.currentUser());
  instructorId = computed(() => this.currentUser()?.id || '');
  filteredCourses = computed(() => this.courses().filter(c => c.instructorId === this.instructorId()));
  selectedCourse = computed(() => this.filteredCourses().find(c => c.id === this.selectedCourseId()));

  constructor(){
    const user = this.auth.currentUser();
    if(!user || user.role !== 'instructor'){ return; }
    this.loadInitial();
    // categoryId değişince otomatik resim set et (manuel override edilmediyse)
    const catCtrl = this.form.get('categoryId');
    const imgCtrl = this.form.get('image');
    if(catCtrl && imgCtrl){
      this.subs.push(catCtrl.valueChanges.subscribe(val => {
        if(!val) return;
        if(this.manualImage) return;
        const mapped = this.categoryImageMap[val];
        if(mapped){ imgCtrl.setValue(mapped); }
      }));
      // Kullanıcı image alanını manuel değiştirirse bayrak ata
      this.subs.push(imgCtrl.valueChanges.subscribe(() => {
        // Eğer kategori seçimi sonucu map edilen değer değilse manuel say
        const catVal = catCtrl.value as string;
        const expected = this.categoryImageMap[catVal];
        if(imgCtrl.value && imgCtrl.value !== expected){
          this.manualImage = true;
        }
      }));
    }
  }

  ngOnDestroy(){
    this.subs.forEach(s => s?.unsubscribe?.());
  }

  private loadInitial(){
    this.loading.set(true);
    this.api.list<any>('categories').subscribe(cats => this.categories.set(cats));
    this.api.list<any>('courses').subscribe(all => {
      this.courses.set(all);
      this.loading.set(false);
    });
  }

  edit(course: any){
    this.form.reset({
      id: course.id,
      title: course.title,
      description: course.description,
      categoryId: course.categoryId,
      price: course.price,
      durationHours: course.durationHours,
      level: course.level || 'Başlangıç',
      image: course.image || ''
    });
    this.selectedCourseId.set(course.id);
    // Edit modunda eğer image kategori defaultlarından biri ise manuel bayrağını kapat
    const cat = course.categoryId;
    if(course.image && this.categoryImageMap[cat] === course.image){
      this.manualImage = false;
    } else {
      this.manualImage = true; // farklı özel resim
    }
  }

  newCourse(){
    this.form.reset({ id: '', title: '', description: '', categoryId: '', price: 0, durationHours: 1, level: 'Başlangıç', image: '' });
    this.selectedCourseId.set('');
    this.manualImage = false;
  }

  save(){
    if(this.form.invalid || !this.instructorId()) { this.form.markAllAsTouched(); return; }
    const v = this.form.value as any;
    const payload = {
      title: v.title,
      description: v.description,
      categoryId: v.categoryId,
      price: Number(v.price),
      durationHours: Number(v.durationHours),
      level: v.level,
      image: v.image || this.categoryImageMap[v.categoryId] || '',
      instructorId: this.instructorId(),
      instructorName: [this.currentUser()?.name, this.currentUser()?.surname].filter(Boolean).join(' ').trim(),
      instructorPhoto: this.currentUser()?.profilePhoto || 'assets/logo.png'
    };
    this.saving.set(true);
    if(v.id){
      this.api.put<any>(`courses/${v.id}`, payload).subscribe(updated => {
        const list = this.courses().map(c => c.id === v.id ? updated as any : c);
        this.courses.set(list);
        this.saving.set(false);
      });
    } else {
      this.api.post<any>('courses', payload).subscribe(created => {
        this.courses.set([...this.courses(), created as any]);
        this.saving.set(false);
        this.form.patchValue({ id: (created as any).id });
        this.selectedCourseId.set((created as any).id);
      });
    }
  }

  formatPrice(){
    const ctrl = this.form.get('price');
    if(!ctrl) return;
    const val = Number(ctrl.value);
    if(isNaN(val)) { ctrl.setValue(0); return; }
    ctrl.setValue(parseFloat(val.toFixed(2)), { emitEvent: false });
  }

  remove(course: any){
    if(!confirm('Silmek istediğinize emin misiniz?')) return;
    this.api.delete(`courses/${course.id}`).subscribe(() => {
      this.courses.set(this.courses().filter(c => c.id !== course.id));
      if(this.selectedCourseId() === course.id){ this.newCourse(); }
    });
  }

  addLesson(){
    if(this.lessonForm.invalid || !this.selectedCourse()) { this.lessonForm.markAllAsTouched(); return; }
    const v = this.lessonForm.value as any;
    const payload = { courseId: this.selectedCourseId(), title: v.title, durationMin: Number(v.durationMin) };
    this.addingLesson.set(true);
    this.api.post('lessons', payload).subscribe({
      next: () => { this.addingLesson.set(false); this.lessonForm.reset({ title: '', durationMin: 10 }); alert('Ders eklendi'); },
      error: () => { this.addingLesson.set(false); alert('Ders eklenemedi'); }
    });
  }
}
