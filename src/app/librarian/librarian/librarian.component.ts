import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.css',
})
export class LibrarianComponent {
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Library | Librarian');
  }

  logout() {
    // Remove JWT token from local storage
    localStorage.removeItem('jwt_token');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
