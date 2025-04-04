import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { AccountComponent } from './Pages/account/account.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { TinTucComponent } from './Pages/News/tin-tuc/tin-tuc.component';
import { New1Component } from './Pages/News/New/new1/new1.component';
import { New2Component } from './Pages/News/New/new2/new2.component';
import { New3Component } from './Pages/News/New/new3/new3.component';
import { New4Component } from './Pages/News/New/new4/new4.component';
import { Train1Component } from './Pages/News/Trains/train1/train1.component';
import { Train2Component } from './Pages/News/Trains/train2/train2.component';
import { Train3Component } from './Pages/News/Trains/train3/train3.component';
import { Train4Component } from './Pages/News/Trains/train4/train4.component';
import { TrainingComponent } from './Pages/News/training/training.component';
import { MainLayoutComponent } from './Pages/News/main-layout/main-layout.component';
import { NutritionComponent } from './Pages/News/nutrition/nutrition.component';
import { Nutri1Component } from './Pages/News/nutri/nutri1/nutri1.component';
import { Nutri2Component } from './Pages/News/nutri/nutri2/nutri2.component';
import { Nutri3Component } from './Pages/News/nutri/nutri3/nutri3.component';
import { Nutri4Component } from './Pages/News/nutri/nutri4/nutri4.component';
import { Nutri10Component } from './Pages/News/nutri/nutri10/nutri10.component';
import { Nutri5Component } from './Pages/News/nutri/nutri5/nutri5.component';
import { Nutri6Component } from './Pages/News/nutri/nutri6/nutri6.component';
import { Nutri7Component } from './Pages/News/nutri/nutri7/nutri7.component';
import { Nutri8Component } from './Pages/News/nutri/nutri8/nutri8.component';
import { Nutri9Component } from './Pages/News/nutri/nutri9/nutri9.component';
import { PersonalTrainerComponent } from './Pages/personal-trainer/personal-trainer.component';
import { HopeComponent } from './Pages/hope/hope.component';
import { PromotionalComponent } from './Pages/promotional/promotional.component';
import { Component, NgModule } from '@angular/core';
import { SportsComponent } from './Pages/Sports/sports/sports.component';
import { BranchesComponent } from './Pages/branches/branches.component';

export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'account/:id', component: AccountComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'news/news1', component: New1Component },
    { path: 'news/news2', component: New2Component },
    { path: 'news/news3', component: New3Component },
    { path: 'news/news4', component: New4Component },
    { path: 'news/train1', component: Train1Component },
    { path: 'news/train2', component: Train2Component },
    { path: 'news/train3', component: Train3Component },
    { path: 'news/train4', component: Train4Component },
    { path: 'news/nutrition1', component: Nutri1Component },
    { path: 'news/nutrition2', component: Nutri2Component },
    { path: 'news/nutrition3', component: Nutri3Component },
    { path: 'news/nutrition4', component: Nutri4Component },
    { path: 'news/nutrition5', component: Nutri5Component },
    { path: 'news/nutrition6', component: Nutri6Component },
    { path: 'news/nutrition7', component: Nutri7Component },
    { path: 'news/nutrition8', component: Nutri8Component },
    { path: 'news/nutrition9', component: Nutri9Component },
    { path: 'news/nutrition10', component: Nutri10Component },
    { path: 'branch-detail/:id' , component: BranchesComponent},
    {path: 'news',
    component: MainLayoutComponent, 
    children: [
      { path: '', component: TinTucComponent },
      { path: 'train', component: TrainingComponent }, 
      { path: 'nutrition', component: NutritionComponent }, 
    ],
  },
  { path: 'personal-trainer', component: PersonalTrainerComponent },
  { path: 'hope', component: HopeComponent },
  { path: 'promotional', component: PromotionalComponent },
  { path: 'sports', component: SportsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Bắt đầu từ đầu trang khi chuyển route
      anchorScrolling: 'enabled',           // Duyệt đến anchor nếu có
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}