import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { AccountComponent } from './Pages/account/account.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { TinTucComponent } from './Pages/News/tin-tuc/tin-tuc.component';
import { New1Component } from './Pages/News/new1/new1.component';

export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'account/:id', component: AccountComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'news', component: TinTucComponent },
    { path: 'news1', component: New1Component },
    
];
