import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BudgetComponent } from './budget/budget.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeEnvelopesComponent } from './home-envelopes/home-envelopes.component';
import { HomeBillsComponent } from './home-bills/home-bills.component';
import { HomeBanksComponent } from './home-banks/home-banks.component';
import { HomeEnvelopeComponent } from './home-envelope/home-envelope.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { HomeBillComponent } from './home-bill/home-bill.component';
import { HomeBankComponent } from './home-bank/home-bank.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddPaymentMethodComponent } from './addpaymentmethod/addpaymentmethod.component';
import { AddPaymentMethodsComponent } from './addpaymentmethods/addpaymentmethods.component';
import { AuthInterceptor } from './auth.service';
import { HomeEnvelopeDetailsComponent } from './home-envelope-details/home-envelope-details.component';
import { HomeBankDetailsComponent } from './home-bank-details/home-bank-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TransactionsComponent,
    BudgetComponent,
    BillDetailsComponent,
    SettingsComponent,
    LoginComponent,
    HomeOverviewComponent,
    HomeEnvelopesComponent,
    HomeBillsComponent,
    HomeBillComponent,
    HomeBanksComponent,
    HomeBankComponent,
    HomeEnvelopeComponent,
    ForgotComponent,
    HomeBillComponent,
    HomeBankComponent,
    AddPaymentMethodsComponent,
    TransactionComponent,
    AddPaymentMethodComponent,
    RegisterComponent,
    HomeEnvelopeDetailsComponent,
    HomeBankDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'budget', component: BudgetComponent },
        { path: 'transactions', component: TransactionsComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'login', component: LoginComponent},
        { path: 'forgot', component: ForgotComponent},
        { path: 'register', component: RegisterComponent },
        { path: 'home-envelope-details', component: HomeEnvelopeDetailsComponent },
        { path: 'home-bank-details', component: HomeBankDetailsComponent },
        { path: 'billdetails', component: BillDetailsComponent }
    ])
  ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useFactory: function (router: Router) {
            return new AuthInterceptor(router);
        },
        multi: true,
        deps: [Router]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
