import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: ['.container {margin-top: 77px; margin-bottom: 77px;}'],
})
export class AppComponent {
  title = 'persons2-crud';
}
