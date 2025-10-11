import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ChangeDetectionStrategy } from '@angular/core';
import { Api } from './services/api';
import { lastValueFrom } from 'rxjs';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class App {
  protected title = 'project';
  tokenStatus = false;
  constructor(private api: Api, private cdr: ChangeDetectorRef) {
    this.authControl();
  }
  async authControl() {
    try { 
      const res = await lastValueFrom( this.api.userProfileSync() )
      if (res) {
        this.tokenStatus = true
        console.log('authControl çalıştı true')
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.tokenStatus = false
      console.log('authControl çalıştı false')
      this.cdr.detectChanges();
    }
  }
}


