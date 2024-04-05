import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { BookManagementComponent } from './admin/bookmanagement/bookmanagement.component';
import { AddbooksComponent } from './admin/addbooks/addbooks.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { ManageaccountsComponent } from './admin/manageaccounts/manageaccounts.component';
import { LibrarianComponent } from './librarian/librarian/librarian.component';
import { BorrowerComponent } from './borrower/borrower/borrower.component';
import { AccountsComponent } from './admin/accounts/accounts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Admin
  {
    path: 'adminDashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'bookmanagement',
    component: BookManagementComponent,
    canActivate: [AuthGuard],
  },
  { path: 'addbooks', component: AddbooksComponent, canActivate: [AuthGuard] },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard],
  },
  // Librarian
  {
    path: 'librarianDashboard',
    component: LibrarianComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'borrowerDashboard',
    component: BorrowerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manageaccounts',
    component: ManageaccountsComponent,
    canActivate: [AuthGuard],
  },
  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
