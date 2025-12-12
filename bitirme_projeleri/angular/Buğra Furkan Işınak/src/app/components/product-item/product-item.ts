import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/IProducts';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { AuthService } from '../../utils/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem implements OnInit {
  @Input() user: any; // veya User tipini kullan
  @Input() item: Product = {} as Product;

  // async pipe ile template'de kullanılacak

  constructor(private api: Api, private auth: AuthService) {
  }

  ngOnInit() {}

  isEnrolled(courseId: number, user: any): boolean {
    return user?.courses?.some((c: any) => c.id === courseId);
  }

  joinCourse(course: any, user: any) {
    if(user.courses.find((c: any) => c.id === course.id)) {
      alert('Zaten bu kursa kayıtlısın.');
      return;
    }

    user.courses.push({ id: course.id, title: course.title });

    const product = this.api.productById(course.id);
    product.subscribe((prod: any) => {
      if(prod) {
        const stock = prod.stock - 1;
        this.api.stockUpdate(course.id, stock).subscribe({
          next: () => {
            this.api.updateUsersProducts(user, course.id, stock).subscribe({
              error: (err) => console.error('Kursa kullanıcı eklenirken hata', err)
            });
            // AuthService güncelle
            this.auth.setUser(user);
          },
          error: (err) => console.error('Stok güncellenirken hata', err)
        });
      } else {
        alert('Kurs bilgisi alınamadı.');
      }
    });
  }

  removeCourse(course: any, user: any) {
    if(!user.courses.find((c: any) => c.id === course.id)) {
      alert('Bu kursa kayıtlı değilsin.');
      return;
    }

    user.courses = user.courses.filter((c: any) => c.id !== course.id);

    const product = this.api.productById(course.id);
    product.subscribe((prod: any) => {
      if(prod) {
        const stock = prod.stock + 1;
        this.api.stockUpdate(course.id, stock).subscribe({
          next: () => {
            this.api.updateUsersProducts(user, course.id, stock).subscribe({
              error: (err) => console.error('Kursa kullanıcı çıkarılırken hata', err)
            });
            // AuthService güncelle
            this.auth.setUser(user);
          },
          error: (err) => console.error('Stok güncellenirken hata', err)
        });
      } else {
        alert('Kurs bilgisi alınamadı.');
      }
    });
  }
}
