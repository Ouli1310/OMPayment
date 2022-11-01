import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AddTransactionComponent } from './components/transactions/add-transaction/add-transaction.component';
import { ListeTransactionComponent } from './components/transactions/liste-transaction/liste-transaction.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChartComponent } from './components/chart/chart.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChartSyntheseComponent } from './components/chart-synthese/chart-synthese.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CashInComponent } from './components/cash-in/cash-in.component';
import { ListeCashInsComponent } from './components/liste-cash-ins/liste-cash-ins.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LayoutComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'transactions', component: ListeTransactionComponent},
  { path: 'transactions/add-transaction', component: AddTransactionComponent},
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'sidebard', component: SidebarComponent},
  { path: 'chart', component: ChartComponent },
  { path: '', component: LayoutComponent},
  { path: 'chart-synthese', component: ChartSyntheseComponent},
  { path: 'userManagement', component: UserManagementComponent},
  { path: 'user/updateUser/:id', component: UpdateUserComponent},
  { path: 'cashIn', component: ListeCashInsComponent},
  { path: 'cashIn/add-cashIn', component: CashInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
