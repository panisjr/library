import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private router: Router, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Library | Dashboard');
  }
  logout() {
    // Remove JWT token from local storage
    localStorage.removeItem('jwt_token');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
