import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'; // Ensure this line is present
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { BookManagementComponent } from './bookmanagement/bookmanagement.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManageaccountsComponent } from './manageaccounts/manageaccounts.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

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
    QrcodeComponent
  ],
  imports: [
    QRCodeModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt_token'),
        allowedDomains: ['example.com'], // Add the domain(s) where your API is hosted
        disallowedRoutes: [] // Add routes that should not include the JWT token
      }
    })
    
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
