import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-user-chats',
  templateUrl: './user-chats.component.html',
  styleUrls: ['./user-chats.component.scss']
})
export class UserChatsComponent implements OnInit {

  constructor(
    public _shared:SharedService
  ) {

  }
  onScroll(){

  }
  ngOnInit(): void {
  }

}
