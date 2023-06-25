import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerReceiptsComponent } from './customer-receipts/customer-receipts.component';
import { CustomerComponent } from './customer/customer.component';
import { EnterpriseBuyersComponent } from './enterprise-buyers/enterprise-buyers.component';
import { EnterpriseItemCategoriesComponent } from './enterprise-item-categories/enterprise-item-categories.component';
import { EnterpriseItemsServicesComponent } from './enterprise-items-services/enterprise-items-services.component';
import { EnterpriseReceiptPublishComponent } from './enterprise-receipt-publish/enterprise-receipt-publish.component';
import { EnterpriseReportsComponent } from './enterprise-reports/enterprise-reports.component';
import { EnterpriseTablesComponent } from './enterprise-tables/enterprise-tables.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'admin', component: AdminComponent},
  {path:'adminLogin', component: AdminLoginComponent},
  {path:'customer', component: CustomerComponent},
  {path:'customerReceipts', component: CustomerReceiptsComponent},
  {path:'enterprise', component: EnterpriseComponent},
  {path:'enterpriseBuyers', component: EnterpriseBuyersComponent},
  {path:'enterpriseItemsServices', component: EnterpriseItemsServicesComponent},
  {path:'enterpriseItemCategories', component: EnterpriseItemCategoriesComponent},
  {path:'enterpriseReceiptPublish', component: EnterpriseReceiptPublishComponent},
  {path:'enterpriseReports', component: EnterpriseReportsComponent},
  {path:'enterpriseTables', component: EnterpriseTablesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
