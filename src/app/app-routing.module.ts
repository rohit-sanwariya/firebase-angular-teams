import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  {
    path:'',canActivate:[AuthGuard],
    loadChildren:()=>import("./Pages/home/home.module").then(m=>m.HomeModule),
    pathMatch:'full'
  },
  {
    path:'login',canActivate:[LoginGuard],
    loadChildren:()=>import("./Pages/login/login.module").then(m=>m.LoginModule),
    pathMatch:'full'
  },
  {
    path:'register',canActivate:[LoginGuard],
    loadChildren:()=>import("./Pages/register/register.module").then(m=>m.RegisterModule),
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
