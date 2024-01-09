import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";


const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:'dashboard',
    canActivate:[AuthGuard],
    loadChildren: () => import('../app/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:"full"
  },
  {
    path: '**',
    redirectTo:'dashboard',
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
