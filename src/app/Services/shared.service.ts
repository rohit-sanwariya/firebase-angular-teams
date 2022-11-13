import { Injectable } from '@angular/core';
import { UserModel } from '../Models/other-person';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  otherPerson!:UserModel;
  currentUser!: UserModel;
  constructor() { }
}
