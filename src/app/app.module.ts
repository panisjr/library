import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http'; // Ensure this line is present

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {
  JwtHelperService,
  JwtInterceptor,
  JwtModule,
} from '@auth0/angular-jwt';
import { BookManagementComponent } from './admin/bookmanagement/bookmanagement.component';
import { AddbooksComponent } from './admin/addbooks/addbooks.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { ManageaccountsComponent } from './admin/manageaccounts/manageaccounts.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LibrarianComponent } from './librarian/librarian/librarian.component';
import { BorrowerComponent } from './borrower/borrower/borrower.component';
import { AccountsComponent } from './admin/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    BookManagementComponent,
    AddbooksComponent,
    InventoryComponent,
    ManageaccountsComponent,
    LibrarianComponent,
    BorrowerComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt_token'),
        allowedDomains: ['example.com'], // Add the domain(s) where your API is hosted
        disallowedRoutes: [], // Add routes that should not include the JWT token
      },
    }),
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
