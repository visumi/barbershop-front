import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule,
NbButtonModule, NbAlertModule, NbSelectModule, NbSidebarModule, NbCalendarModule, NbListModule, NbToggleModule, NbUserModule,
NbSpinnerModule, NbContextMenuModule, NbMenuModule, NbToastrModule, NbWindowModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { RegisterComponent } from './core/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeComponent } from './core/change/change.component';
import { ChangeFormComponent } from './core/change/change-form/change-form.component';
import { ProductModalComponent } from './core/dashboard/product-modal/product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ChangeComponent,
    ChangeFormComponent,
    ProductModalComponent
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
    HttpClientModule,
    NbToggleModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
