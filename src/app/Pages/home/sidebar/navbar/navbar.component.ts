import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }

}
