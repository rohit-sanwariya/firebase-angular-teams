import { Component, ElementRef, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  constructor( public _shared:SharedService) { }

  ngOnInit(): void {
  }
  handleImageUpload(input:HTMLInputElement){
    input.click();
  }
  onKeyPress(event:KeyboardEvent){
    if(event.key==="Enter"){
      this._shared.sendMessage();
    }

  }
}
