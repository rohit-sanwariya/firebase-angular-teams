import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @ViewChild('containerRef') container!:ElementRef;
  constructor(
    public _shared:SharedService,
  ) {
    this._shared.scrollToBottom.subscribe((val:boolean)=>{
      if(val){
        console.log(this.container.nativeElement.scrollHeight);
        setTimeout(() => {
          this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
        }, 50);


      }
    })
  }

  ngOnInit(): void {
  }


}
