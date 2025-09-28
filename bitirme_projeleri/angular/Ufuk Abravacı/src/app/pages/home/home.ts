import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterLink],
  templateUrl: './home.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  
}
