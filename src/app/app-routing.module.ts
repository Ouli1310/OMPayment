import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddTransactionComponent } from './transactions/add-transaction/add-transaction.component';
import { ListeTransactionComponent } from './transactions/liste-transaction/liste-transaction.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'transactions', component: ListeTransactionComponent},
  { path: 'transactions/ajouter-transaction', component: AddTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
