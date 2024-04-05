import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent {
  accounts: any[] = [];
  name: string = '';
  role: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  @ViewChild('exampleModal') modal: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Library | Accounts');
    this.fetchAccounts();
  }
  closeModal() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  fetchAccounts() {
    // Make HTTP GET request to backend API to fetch accounts
    this.http.get<any[]>('http://localhost:3000/accounts').subscribe(
      (response) => {
        this.accounts = response; // Assign fetched accounts to component property
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  register() {
    if (this.password !== this.confirm_password) {
      // Handling password mismatch
      this.clearFormAndErrorMessage();
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (
      this.name === '' ||
      this.email === '' ||
      this.password === '' ||
      this.role === ''
    ) {
      // Handling incomplete form
      this.clearFormAndErrorMessage();
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
        // Handling successful registration
        this.clearFormAndErrorMessage();
        // this.successMessage = response.message;
        // this.modal.show();
        window.location.reload();
      },
      (error) => {
        // Handling registration error
        console.error('Error registering user:', error);
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'An error occurred during the registration.';
        }
        setTimeout(() => {
          this.errorMessage = ''; // Clear error message after 5 seconds
        }, 5000);
      }
    );
  }

  clearFormAndErrorMessage() {
    // Clear form fields and error messages
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirm_password = '';
    this.role = '';
    this.errorMessage = '';
  }
}
