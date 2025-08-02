import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class App {
  protected title = 'project';
  tokenStatus = false
  constructor(private api: Api, private cdr: ChangeDetectorRef) {
    this.authControl()
  }

  async authControl() {
    try {
      const res = await this.api.userProfileSync()
      if (res) {
        this.tokenStatus = true
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.tokenStatus = false
      this.cdr.detectChanges();
    }
  }

}
