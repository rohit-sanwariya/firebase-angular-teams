import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
const routes:Routes = [
  {
    path:'',component:RegisterComponent
  }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class RegisterModule { }
