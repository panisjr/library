import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { BookManagementComponent } from './bookmanagement/bookmanagement.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManageaccountsComponent } from './manageaccounts/manageaccounts.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'bookmanagement', component: BookManagementComponent},
  { path: 'addbooks', component: AddbooksComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'manageaccounts', component: ManageaccountsComponent },
  { path: 'qrcode', component: QrcodeComponent },
  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
