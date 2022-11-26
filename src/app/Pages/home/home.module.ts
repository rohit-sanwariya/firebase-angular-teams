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
import { ChatNavbarComponent } from './chat/chat-navbar/chat-navbar.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { MessageItemComponent } from './chat/messages/message-item/message-item.component';
import { MessageInputComponent } from './chat/message-input/message-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ChatItemComponent,
    ChatNavbarComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageInputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InfiniteScrollModule,
    ReactiveFormsModule,

    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
