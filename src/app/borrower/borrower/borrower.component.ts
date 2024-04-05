import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrl: './borrower.component.css',
})
export class BorrowerComponent {
  constructor(private router: Router, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Library');
  }

  logout() {
    // Remove JWT token from local storage
    localStorage.removeItem('jwt_token');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
