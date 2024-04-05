import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { } // Inject Router

  checkToken() {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      console.log('Token payload:', tokenPayload);
    }
  }

  login() {
    const userData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:3000/login', userData)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          if (response.token) {
            localStorage.setItem('jwt_token', response.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          console.error('Error logging in:', error);
        }
      );
  }
  
}
  