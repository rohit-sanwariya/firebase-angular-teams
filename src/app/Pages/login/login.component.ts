import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visibility:boolean = true;
  constructor(
    public _auth:AuthService
  ) { }

  ngOnInit(): void {
    this._auth.initLoginForm();
  }

}
