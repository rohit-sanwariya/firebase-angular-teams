import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from './sidebar/navbar/navbar.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { SearchComponent } from './sidebar/search/search.component';
import { UserChatsComponent } from './sidebar/user-chats/user-chats.component';
import { ChatItemComponent } from './sidebar/user-chats/chat-item/chat-item.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
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
    SearchComponent,
    UserChatsComponent,
    ChatItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
