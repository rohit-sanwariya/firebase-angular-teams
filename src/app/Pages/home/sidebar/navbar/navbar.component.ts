import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth-service.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public _auth:AuthService,
    public _shared:SharedService,
    ) { }

  ngOnInit(): void {
  }

}
