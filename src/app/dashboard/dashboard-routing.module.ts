import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {UploadedScreenComponent} from "./uploaded-screen/uploaded-screen.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path:'passwords',
        component: UploadedScreenComponent
      },
      {
        path:'',
        redirectTo:'passwords',
        pathMatch: "full"
      },
      {
        path:'**',
        redirectTo:'passwords',
        pathMatch: "full"
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
