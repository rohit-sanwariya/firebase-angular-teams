import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  @Input() self:boolean=false;
  constructor(public _shared:SharedService) { }

  ngOnInit(): void {
  }

}
