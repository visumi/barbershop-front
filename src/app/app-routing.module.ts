import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth-guard.service';
import { RoleGuardService } from './core/role-guard.service';
import { AdminGuardService } from './core/admin-guard.service'
import { ChangeFormComponent } from './core/change/change-form/change-form.component';
import { ChangeComponent } from './core/change/change.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ClientsComponent } from './core/clients/clients.component';
import { ItemsComponent } from './core/items/items.component';
import { ManagerComponent } from './core/manager/manager.component';
import { NewUserComponent } from './core/new-user/new-user.component';

const homeRoute = '/dashboard';

const routes: Routes = [
  { path: '', redirectTo: `${homeRoute}`, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: RegisterComponent },
  {
    path: 'change', component: ChangeComponent,
    children: [
      { path: 'code', component: ChangeFormComponent },
      { path: 'old', component: ChangeFormComponent }
    ]
  },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'items', component: ItemsComponent},
      {
        path: 'manager',
        component: ManagerComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: 'access',
        component: NewUserComponent,
        canActivate: [RoleGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
