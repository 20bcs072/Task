import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { ColumnFilter, SortIcon, TableHeaderCheckbox, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LazyLoadComponent,
    DropdownComponent,
    CreateComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    CheckboxModule,
    InputTextModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      }
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
