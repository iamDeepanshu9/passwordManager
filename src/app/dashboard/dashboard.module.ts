import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MaterialModule} from "../material/material.module";
import { UploadedScreenComponent } from './uploaded-screen/uploaded-screen.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddnewpasswordComponent } from './addnewpassword/addnewpassword.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    UploadedScreenComponent,
    AddnewpasswordComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatListModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
