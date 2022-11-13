import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  options:Array<string>=["Rahul","Rohit","Virat"];
  constructor(
    public _search:SearchService
  ) { }

  ngOnInit(): void {
  }

}
