import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from './sidebar/navbar/navbar.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SearchComponent } from './sidebar/search/search.component';

const routes:Routes = [
  {
    path:'',component:HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    ChatComponent,
    NavbarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
