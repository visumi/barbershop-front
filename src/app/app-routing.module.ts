import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth-guard.service';
import { ChangeComponent } from './core/change/change.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

const homeRoute = '/dashboard';

const routes: Routes = [
  { path: '', redirectTo: `${homeRoute}`, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: RegisterComponent },
  { path: 'change', component: ChangeComponent },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
