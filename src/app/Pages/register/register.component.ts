import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  visibility:boolean = true;
  visibilityConfirm:boolean = true;
  constructor(
    public _auth:AuthService
  ) { }

  ngOnInit(): void {
    this._auth.initRegisterForm();
  }

}
