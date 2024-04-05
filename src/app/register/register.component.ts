import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  role: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  @ViewChild('exampleModal') modal: any;

  constructor(private http: HttpClient, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Library | Register');
  }
  closeModal() {
    this.errorMessage = null;
    this.successMessage = null;
  }
  register() {
    if (this.password !== this.confirm_password) {
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirm_password = '';
      this.role = '';
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    if (
      this.name === '' ||
      this.email === '' ||
      this.password === '' ||
      this.role === ''
    ) {
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirm_password = '';
      this.role = '';
      this.errorMessage = 'Please make sure to fill in all the fields.';
      return;
    }
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      role: this.role,
    };

    this.http.post<any>('http://localhost:3000/register', userData).subscribe(
      (response) => {
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirm_password = '';
        this.role = '';
        this.successMessage = response.message;
        this.modal.show();
      },
      (error) => {
        console.error('Error registering user:', error);
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error; // Set error message
          setTimeout(() => {
            this.errorMessage = 'An error occured during the registration.'; // Clear error message after 5 seconds
          }, 5000);
        } else {
          this.errorMessage = 'An error occured during the registration.'; // Clear error message after 5 seconds
        }
      }
    );
  }
}
