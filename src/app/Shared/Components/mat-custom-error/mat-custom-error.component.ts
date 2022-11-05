import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-custom-error',
  templateUrl: './mat-custom-error.component.html',
  styleUrls: ['./mat-custom-error.component.scss']
})
export class MatCustomErrorComponent implements OnInit {
  @Input() errorclass:string = 'white-error';
  @Input() errorForField:string='';
  @Input() errorCondition:boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
