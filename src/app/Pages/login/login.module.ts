import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SharedModule } from 'src/app/Shared/shared.module';

const routes:Routes = [
  {
    path:'',component:LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})
export class LoginModule { }
