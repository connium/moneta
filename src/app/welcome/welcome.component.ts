import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public constructor(private readonly router: Router) {
  }

  public onImport() {
    this.router.navigate(['/budget']);
  }
}
