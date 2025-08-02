import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../models/IProducts';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-face',
  imports: [RouterModule],
  templateUrl: './product-face.html',
  styleUrl: './product-face.css'
})
export class ProductFace 
{
  @Input()
  item: IProduct | null = null;
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.cdr.detectChanges();
  }
}