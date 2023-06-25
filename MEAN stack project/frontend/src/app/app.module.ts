import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { EnterpriseBuyersComponent } from './enterprise-buyers/enterprise-buyers.component';
import { EnterpriseItemCategoriesComponent } from './enterprise-item-categories/enterprise-item-categories.component';
import { EnterpriseItemsServicesComponent } from './enterprise-items-services/enterprise-items-services.component';
import { EnterpriseReceiptPublishComponent } from './enterprise-receipt-publish/enterprise-receipt-publish.component';
import { EnterpriseReportsComponent } from './enterprise-reports/enterprise-reports.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EnterpriseTablesComponent } from './enterprise-tables/enterprise-tables.component';
import { CustomerReceiptsComponent } from './customer-receipts/customer-receipts.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    CustomerComponent,
    EnterpriseComponent,
    EnterpriseBuyersComponent,
    EnterpriseItemCategoriesComponent,
    EnterpriseItemsServicesComponent,
    EnterpriseReceiptPublishComponent,
    EnterpriseReportsComponent,
    AdminLoginComponent,
    EnterpriseTablesComponent,
    CustomerReceiptsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
