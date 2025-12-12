import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { Product } from '../../models/IProducts';
import { Comments } from '../../components/comments/comments';
import { Observable } from 'rxjs';
import { AuthService } from '../../utils/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [Comments],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductDetail {

  product: Product | any = null
  globalPrice = ''
  stars:number[] = []
  bigImage = ''
    user!: Observable<any>;
realUser: any;
  constructor(private route: ActivatedRoute, private api: Api, private router: Router, private cdr: ChangeDetectorRef, private auth: AuthService) {
    
  }

  ngOnInit(){
this.route.params.subscribe(params => {
      
      const id = Number(params['id'])      
      if (!Number.isNaN(id) && id > 0) {
        this.api.productById(id).subscribe({
          next: (value) => {
            this.product = value
            this.globalPrice = (this.product.price + ((this.product.price * this.product.discountPercentage) / 100)).toFixed(2)
            this.countStars(this.product.rating)
            this.bigImage = this.product.images[0]
            this.cdr.detectChanges();
          },
          error: (err) => {
            alert("Not found product: " + id)
            this.router.navigate(['/products'])
            this.cdr.detectChanges();
          }
        })
      }else {
          alert("Not found product: " + params['id'])
          this.router.navigate(['/products'])
          this.cdr.detectChanges();
      }
      
    })

   this.auth.user$.subscribe(u => {
    this.realUser = u;
    this.user = u;
    this.cdr.detectChanges();
  });



   
  }

  countStars(rating: number) {
    const arr:number[] = []
    const tamSayi = Math.floor(rating)
    const yarimSayi = Math.ceil(rating - tamSayi)
    const bosSayi = 5 - (tamSayi + yarimSayi)
    for (let i = 0; i < tamSayi; i++) {
      arr.push(1)
    }
    if (yarimSayi > 0) {
      arr.push(0.5)
    }
    for (let i = 0; i < bosSayi; i++) {
      arr.push(0)
    }
    this.stars = arr
  }

  changeImage(img: string) {
    this.bigImage = img
  }

  joinLesson(lessonId: number) {
    if (this.product && this.product.lessons) {
      const lesson = this.product.lessons.find((l: any) => l.id === lessonId);
      if (lesson) {

        alert(`Derse katıldınız: ${lesson.lesson_name}`);
      } else {
        alert('Ders bulunamadı.');
      }
    } else {
      alert('Kurs veya ders bilgisi mevcut değil.');
    }
  }

  
joinlesson(lesson: any, userObj: any) {
  if(userObj.lessons.find((c: any) => c.id === lesson.id)) {
    alert('Zaten bu kursa kayıtlısın.');
    return;
  }
  userObj.lessons.push({...lesson});
  this.api.updateUsersLessons(userObj).subscribe();
}

removelesson(lesson: any, userObj: any) {
  userObj.lessons = userObj.lessons.filter((c: any) => c.id !== lesson.id);
  this.api.updateUsersLessons(userObj).subscribe();
}
isEnrolled(lessonId: number, userObj: any): boolean {
  return userObj.lessons?.some((lesson: any) => lesson.id === lessonId);
}
      
}
