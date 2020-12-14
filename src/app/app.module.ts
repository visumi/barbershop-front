import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule,
NbButtonModule, NbAlertModule, NbSelectModule, NbSidebarModule, NbCalendarModule, NbListModule, NbToggleModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { RegisterComponent } from './core/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbSidebarModule.forRoot(),
    NbSidebarModule,
    NbCardModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    FormsModule,
    NbAlertModule,
    NbSelectModule,
    NbCalendarModule,
    ReactiveFormsModule,
    NbToggleModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
