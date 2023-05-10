import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path:'home', component:HomeComponent, canActivate:[AuthGuard],
    children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'profile',component:ProfileComponent},
      {path:'reports',component:ReportsComponent},
      {path:'setting',component:SettingsComponent},

    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
