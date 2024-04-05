import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  constructor(private http: HttpClient) { }

  register() {
    if (this.password !== this.confirm_password) {
      alert('Passwords do not match');
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirm_password = '';
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password
    };

    this.http.post<any>('http://localhost:3000/register', userData)
      .subscribe(
        response => {
          alert('Registration Successful');
          console.log('Registration successful:', response);
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirm_password = '';
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
  }
}
